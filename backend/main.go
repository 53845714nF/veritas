package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
	"github.com/pocketbase/pocketbase/tools/types"
)

func main() {
	app := pocketbase.New()

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {

		caCollection := &models.Collection{
			Name:       "certification_authority",
			Type:       models.CollectionTypeBase,
			ListRule:   types.Pointer("@request.auth.id != ''"),
			ViewRule:   nil,
			CreateRule: nil,
			UpdateRule: nil,
			DeleteRule: nil,
			Schema: schema.NewSchema(
				&schema.SchemaField{
					Name:     "email",
					Type:     schema.FieldTypeEmail,
					Required: true,
				},
				&schema.SchemaField{
					Name:     "country",
					Type:     schema.FieldTypeText,
					Required: true,
					Options: &schema.TextOptions{
						Max: types.Pointer(2),
					},
				},
				&schema.SchemaField{
					Name:     "state",
					Type:     schema.FieldTypeText,
					Required: true,
				},
				&schema.SchemaField{
					Name:     "locality",
					Type:     schema.FieldTypeText,
					Required: true,
				},
				&schema.SchemaField{
					Name:     "orgName",
					Type:     schema.FieldTypeText,
					Required: true,
				},
				&schema.SchemaField{
					Name:     "orgUnit",
					Type:     schema.FieldTypeText,
					Required: true,
				},
				&schema.SchemaField{
					Name:     "days",
					Type:     schema.FieldTypeNumber,
					Required: true,
				},
				&schema.SchemaField{
					Name:     "caFile",
					Type:     schema.FieldTypeFile,
					Required: true,
				},
			),
		}

		caCollection.SetId("certificationauthority")

		if err := app.Dao().SaveCollection(caCollection); err != nil {
			return err
		}

		certCollection := &models.Collection{
			Name:       "cert",
			Type:       models.CollectionTypeBase,
			ListRule:   types.Pointer("@request.auth.id != ''"),
			ViewRule:   nil,
			CreateRule: nil,
			UpdateRule: nil,
			DeleteRule: nil,
			Schema: schema.NewSchema(
				&schema.SchemaField{
					Name:     "ca",
					Type:     schema.FieldTypeRelation,
					Required: true,
					Options: &schema.RelationOptions{
						MaxSelect:     types.Pointer(1),
						CollectionId:  "certificationauthority",
						CascadeDelete: false,
					},
				},
				&schema.SchemaField{
					Name:     "web_crt_file",
					Type:     schema.FieldTypeFile,
					Required: true,
				},
				&schema.SchemaField{
					Name:     "server_key",
					Type:     schema.FieldTypeFile,
					Required: true,
				},
				&schema.SchemaField{
					Name:     "apache_conf_file",
					Type:     schema.FieldTypeFile,
					Required: true,
				},
			),
		}

		certCollection.SetId("cert")

		if err := app.Dao().SaveCollection(certCollection); err != nil {
			return err
		}

		// or you can also use the shorter e.Router.GET("/api/veritas/createca", handler, middlewares...)
		e.Router.AddRoute(echo.Route{
			Method: http.MethodPost,
			Path:   "/api/veritas/createca",
			Handler: func(c echo.Context) error {
				var name = c.FormValue("name")
				var email = c.FormValue("email")
				var country = c.FormValue("country")
				var state = c.FormValue("state")
				var locality = c.FormValue("locality")
				var orgName = c.FormValue("org_name")
				var orgUnit = c.FormValue("org_unit")
				var cname = c.FormValue("cname")
				var days = c.FormValue("days")

				switch "" {
				case name, email, country, state, locality, orgName, orgUnit, cname, days:
					return apis.NewBadRequestError("One of the arguments is empty, or not set.", nil)
				}

				cmd := &exec.Cmd{
					Path: "/opt/create_root_cert.sh",
					Args: []string{"/opt/create_root_cert.sh",
						name,
						country,
						state,
						locality,
						orgName,
						orgUnit,
						cname,
						email,
						days},
					Stdout: os.Stdout,
					Stderr: os.Stdout,
				}

				err := cmd.Start()
				if err != nil {
					return err
				}

				caCollection, err := app.Dao().FindCollectionByNameOrId("certification_authority")
				if err != nil {
					return err
				}

				caRecord := models.NewRecord(caCollection)
				caRecord.Set("id", name)
				caRecord.Set("email", email)
				caRecord.Set("country", country)
				caRecord.Set("state", state)
				caRecord.Set("locality", locality)
				caRecord.Set("orgName", orgName)
				caRecord.Set("orgUnit", orgUnit)
				caRecord.Set("cname", cname)
				caRecord.Set("days", days)
				caRecord.Set("caFile", name+".pem")

				if err := app.Dao().SaveRecord(caRecord); err != nil {
					return apis.NewBadRequestError(err.Error(), nil)
				}

				return c.String(http.StatusOK, "Success")

			},
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
				//apis.RequireAdminAuth(),
			},
		})

		e.Router.AddRoute(echo.Route{
			Method: http.MethodPost,
			Path:   "/api/veritas/createcert",
			Handler: func(c echo.Context) error {
				var ca = c.FormValue("ca")
				var url = c.FormValue("url")

				switch "" {
				case ca, url:
					return apis.NewBadRequestError("One of the arguments is empty, or not set.", nil)
				}

				caRecord, _ := app.Dao().FindRecordById("certification_authority", ca)

				var country = fmt.Sprintf("%v", caRecord.Get("country"))
				var state = fmt.Sprintf("%v", caRecord.Get("state"))
				var locality = fmt.Sprintf("%v", caRecord.Get("locality"))
				var orgName = fmt.Sprintf("%v", caRecord.Get("orgName"))
				var days = fmt.Sprintf("%v", caRecord.Get("days"))

				cmd := &exec.Cmd{
					Path: "/opt/create_domain_cert.sh",
					Args: []string{"/opt/create_domain_cert.sh",
						url,
						ca,
						country,
						state,
						locality,
						orgName,
						days},
					Stdout: os.Stdout,
					Stderr: os.Stdout,
				}

				err := cmd.Start()
				if err != nil {
					return err
				}

				certCollection, err := app.Dao().FindCollectionByNameOrId("cert")
				if err != nil {
					return err
				}

				certRecord := models.NewRecord(certCollection)
				certRecord.Set("ca", ca)
				certRecord.Set("id", url)
				certRecord.Set("web_crt_file", url+".crt")
				certRecord.Set("server_key", "server.key")
				certRecord.Set("apache_conf_file", "secure_apache.conf")

				if err := app.Dao().SaveRecord(certRecord); err != nil {
					return apis.NewBadRequestError(err.Error(), nil)
				}
				return c.String(http.StatusOK, "Success")

			},
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
				//apis.RequireAdminAuth(),
			},
		})

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}

}

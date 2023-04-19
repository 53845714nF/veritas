export type CaFormData = {
  name: string,
  email: string,
  country: string,
  state: string,
  locality: string,
  orgName: string,
  orgUnit: string,
  cname: string,
  days: string,
}

export default function useCreateCa() {

    async function createCA(data: CaFormData) {

        const url = 'http://0.0.0.0:8090/api/veritas/createca';
        const params = new URLSearchParams({
          name: data.name,
          email: data.email,
          country: data.country,
          state: data.state,
          locality: data.locality,
          org_name: data.orgName,
          org_unit: data.orgUnit,
          cname: data.cname,
          days: data.days
        })
        
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params
        };
      
        try {
          const response = await fetch(url, options);
          const data = await response.text();
          console.log(data);
        } catch (e) {
          alert(e);
        }

      }

    return createCA
}
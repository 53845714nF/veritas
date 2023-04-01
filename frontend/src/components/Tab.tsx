import React, {useState} from "react";
import Tab from "../model/tab";


interface Props {
    tabs: Tab[];
}

export default function Tabs({tabs}: Props) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <>
            <div className="tab">
                <nav>
                    <ul>
                        {tabs.map((tab: Tab, index: number) => (
                            <li key={index} className={index === activeTabIndex ? "active" : ""}
                                onClick={() => handleTabClick(index)}>
                                {tab.title}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            {tabs[activeTabIndex].content}
        </>
    );
}

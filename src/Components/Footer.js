import React from "react"
import SimpleReactFooter from "simple-react-footer"

class Courses extends React.Component {
    render() {
        const description = "The Healing Centre cares for you. It cures all diseases, ailments and problem through divine healing in the form of reiki. You get free treatment and consultation from our Reiki Grandmaster Dr. Jyoti Prabha Srivastava. Learn healing and get degrees of reiki, dowser and attunements."
        const columns = [
            {
                title: "Legal",
                resources: [
                    {
                        name: "Privacy",
                        link: "/privacy"
                    },
                    {
                        name: "Terms",
                        link: "/terms"
                    }
                ]
            },
            {
                title: "Contact",
                resources: [
                    {
                        name: "Locations",
                        link: "/locations"
                    },
                    {
                        name: "Culture",
                        link: "/culture"
                    }
                ]
            }
        ];
        return (
            <div>
                <SimpleReactFooter style={{ width: "1000px" }} description={description}
                    title="ABOUT OUR CENTRE"
                    columns={columns}
                    copyright="THE HEALING CENTRE"
                    backgroundColor="green"
                    fontColor="black"
                    copyrightColor="grey"
                />
            </div>
        )
    }
}

export default Courses
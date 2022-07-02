import React from "react"
import SimpleReactFooter from "simple-react-footer"

class Courses extends React.Component {
    render() {
        const description = "According to wikipedia, the cat (Felis catus) is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family. A cat can either be a house cat, a farm cat or a feral cat; the latter ranges freely and avoids human contact."
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
                    title="About ReikiName"
                    columns={columns}
                    copyright="REIKINAME"
                    backgroundColor="yellow"
                    fontColor="black"
                    copyrightColor="grey"
                />
            </div>
        )
    }
}

export default Courses
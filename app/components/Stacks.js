import HighlightGrid from "./HighlightGrid"

const Stacks = () => {
    const gridData = [
        [
            ["HTML", "CSS", "Tailwind CSS", "BootStrap", "GSAP", "JavaScript (ES6+)"],
            ["React.", "Node.js", "Express.js", "MongoDB", "Java"]
        ],
        [
            ["AWS", "Jenkins", "Docker", "Kubernetes", "SonarQube"],
            ["Nexus", "Bash, Shell Scripting", "Maven", "Terraform", "Ansible", "Git"]
        ]
    ]

    return (
        <>
            {gridData.map((section, i) => (
                <HighlightGrid items={section} key={i} />
            ))}
        </>
    )
}

export default Stacks

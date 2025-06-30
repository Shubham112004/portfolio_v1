"use client"

import { useEffect, useRef } from 'react'
import React from 'react'

const Stacks = () => {

    const containerRef = useRef(null)
    const highlightRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        const highlight = highlightRef.current
        const gridItems = container.querySelectorAll(".grid-item")
        const firstItem = container.querySelector(".grid-item")

        const highlightColors = [
            "#e24e18",
            "#4381c1",
            "#f79824",
            "#04a777",
            "#5b8c5a",
            "#2176ff",
            "#818d92",
            "#22aaa1"
        ]
        gridItems.forEach((item, index) => {
            item.dataset.color = highlightColors[index % highlightColors.length]
        });

        const moveToElement = (element) => {
            if (element) {
                const rect = element.getBoundingClientRect()
                const containerClientRect = container.getBoundingClientRect()
                highlight.style.transform = `translate(${rect.left - containerClientRect.left - 10}px, ${rect.top - containerClientRect.top - 10}px)`
                highlight.style.width = `${rect.width + 20}px`
                highlight.style.height = `${rect.height + 20}px`
                highlight.style.background = `radial-gradient(circle at center, ${element.dataset.color}, transparent)`

            }
        }
        const moveHighlight = (e) => {
            const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
            if (hoveredElement && hoveredElement.classList.contains("grid-item")) {
                moveToElement(hoveredElement)
            } else if (hoveredElement && hoveredElement.parentElement && hoveredElement.parentElement.classList.contains("grid-item")) {
                moveToElement(hoveredElement.parentElement)
            }
        }
        moveToElement(firstItem)
        container.addEventListener("mousemove", moveHighlight)
        return () => {
            container.removeEventListener("mousemove", moveHighlight)
        }
    }, [])

    return (
        <div className='container1' ref={containerRef}>
            <div className="grid1 font-sugar">
                <div className="grid-row">
                    <div className="grid-item"><p>HTML</p></div>
                    <div className="grid-item"><p>CSS</p></div>
                    <div className="grid-item"><p>Tailwind CSS</p></div>
                    <div className="grid-item"><p>BootStrap</p></div>
                    <div className="grid-item"><p>GSAP</p></div>
                    <div className="grid-item"><p>JavaScript (ES6+)</p></div>
                </div>
                <div className="grid-row">
                    <div className="grid-item"><p>React.</p></div>
                    <div className="grid-item"><p>Node.js</p></div>
                    <div className="grid-item"><p>Express.js</p></div>
                    <div className="grid-item"><p>MongoDB</p></div>
                    <div className="grid-item"><p>Java</p></div>
                </div>
            </div>
            <div className="highlight" ref={highlightRef}></div>
        </div>
    )
}

export default Stacks
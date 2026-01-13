export const howItWorksData = {
    intro: {
        title: "How It Works",
        subtitle: "From our orchard to your table in 4 simple steps.",
        description: "Adopting a fruit tree is a unique way to connect with nature and enjoy premium, chemical-free produce. Here is exactly how the process unfolds."
    },
    steps: [
        {
            id: 1,
            title: "Choose Your Tree",
            icon: "🌳",
            description: "Browse our portfolio of fruit trees available for adoption. Each tree is cared for by expert farmers in the Himalayas.",
            points: [
                "Filter by fruit type (Apple, Mango, etc.)",
                "Check harvest windows and estimated yields",
                "Select a region that intrigues you"
            ]
        },
        {
            id: 2,
            title: "Book & Personalize",
            icon: "✍️",
            description: "Once you've made your choice, secure your adoption for the upcoming season.",
            points: [
                "Name your tree (e.g., 'The Smith Family Apple Tree')",
                "Receive a digital adoption certificate",
                "Get introduced to the farmer caring for your tree"
            ]
        },
        {
            id: 3,
            title: "Watch It Grow",
            icon: "🌱",
            description: "This is where the magic happens. While you stay home, we do the hard work.",
            points: [
                "Receive regular photo/video updates",
                "Track growth stages: Flowering, Fruiting, Ripening",
                "Plan a visit to the orchard (optional)"
            ]
        },
        {
            id: 4,
            title: "Harvest & Delivery",
            icon: "📦",
            description: "When the fruit is perfectly ripe, we harvest and ship it directly to you.",
            points: [
                "100% naturally ripened fruit",
                "Delivered within days of harvest",
                "Zero wax, zero chemicals, pure flavor"
            ]
        }
    ],
    useCases: {
        title: "Ways You Can Use This",
        items: [
            {
                id: "personal",
                icon: "🏠",
                title: "For Your Family",
                description: "Enjoy a season's supply of fresh, healthy fruit for your household.",
                modalContent: {
                    title: "For Your Family",
                    description: "Make healthy eating a lifestyle for your entire family. By adopting a tree, you ensure a steady supply of premium, chemical-free fruits that you can trust.",
                    benefits: [
                        "Ditch the supermarket wax and chemicals.",
                        "Teach children where their food comes from.",
                        "Enjoy seasonal, naturally ripened sweetness."
                    ],
                    image: "/images/family-harvest.jpg" // Placeholder
                }
            },
            {
                id: "gift",
                icon: "🎁",
                title: "As a Unique Gift",
                description: "Gift a tree adoption for weddings, birthdays, or anniversaries. It's green and meaningful.",
                modalContent: {
                    title: "A Gift That Grows",
                    description: "Forget bouquets that wither in days. Gift a fruit tree adoption—a present that grows, gives back, and reminds your loved ones of you with every bite.",
                    benefits: [
                        "Perfect for weddings, anniversaries, and birthdays.",
                        "Includes a personalized digital certificate.",
                        "The recipient gets the full harvest delivered."
                    ],
                    image: "/images/gift-tree.jpg" // Placeholder
                }
            },
            {
                id: "corporate",
                icon: "🏢",
                title: "Corporate Gifting",
                description: "Sustainable gifting options for clients and employees that leave a lasting impression.",
                modalContent: {
                    title: "Corporate Sustainability",
                    description: "Align your brand with nature. Corporate tree adoptions are an impactful way to show you care about the planet while delighting your clients and team.",
                    benefits: [
                        "Strengthen ESG and sustainability goals.",
                        "Unique, memorable gifts for high-value clients.",
                        "Team-building through orchard visits."
                    ],
                    image: "/images/corporate-gifting.jpg" // Placeholder
                }
            },
            {
                id: "schools",
                icon: "🎓",
                title: "For Schools",
                description: "An interactive way for nature clubs and classes to learn about agriculture.",
                modalContent: {
                    title: "Educational Experience",
                    description: "Bring the farm to the classroom. Adopt a tree as a class project and follow its journey through the seasons.",
                    benefits: [
                        "Hands-on learning about biology and farming.",
                        "Virtual field trips and farmer Q&A sessions.",
                        "Healthy fruit parties at harvest time."
                    ],
                    image: "/images/school-project.jpg" // Placeholder
                }
            }
        ]
    }
};

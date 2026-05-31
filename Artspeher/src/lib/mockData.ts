export interface Project {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
}

export interface Creator {
  id: string;
  name: string;
  title: string;
  avatar: string;
  coverImage: string;
  bio: string;
  skills: string[];
  projects: Project[];
  rate: string;
}

export const MOCK_CREATORS: Creator[] = [
  {
    id: "1",
    name: "Alex Rivera",
    title: "Senior UI/UX Designer",
    avatar: "https://i.pravatar.cc/150?u=alex",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    bio: "I craft digital experiences that are not only beautiful but also highly functional. Specializing in SaaS and Web3.",
    skills: ["Figma", "UI Design", "Prototyping", "Design Systems"],
    rate: "$80/hr",
    projects: [
      { id: "p1", title: "Fintech Dashboard", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", likes: 342 },
      { id: "p2", title: "Crypto Mobile App", imageUrl: "https://images.unsplash.com/photo-1616077168079-7e09a6a38f4d?q=80&w=2567&auto=format&fit=crop", likes: 215 },
      { id: "p3", title: "E-commerce Redesign", imageUrl: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2340&auto=format&fit=crop", likes: 189 },
    ]
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    title: "3D Artist & Animator",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2340&auto=format&fit=crop",
    bio: "Bringing imagination to life through 3D art and fluid animations. Working with top gaming and tech brands.",
    skills: ["Blender", "Cinema 4D", "Animation", "Character Design"],
    rate: "$120/hr",
    projects: [
      { id: "p4", title: "Cyberpunk Cityscape", imageUrl: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2340&auto=format&fit=crop", likes: 892 },
      { id: "p5", title: "Abstract Shapes", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", likes: 512 },
    ]
  },
  {
    id: "3",
    name: "Marcus Cole",
    title: "Brand Strategist",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    coverImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2308&auto=format&fit=crop",
    bio: "Helping startups find their voice and visual identity in crowded markets.",
    skills: ["Branding", "Typography", "Logo Design", "Strategy"],
    rate: "$95/hr",
    projects: [
      { id: "p6", title: "NeoBrand Identity", imageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2486&auto=format&fit=crop", likes: 145 },
      { id: "p7", title: "Organic Coffee Co.", imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2573&auto=format&fit=crop", likes: 201 },
    ]
  }
];

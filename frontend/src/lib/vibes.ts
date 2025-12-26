// Vibe Taxonomy Data for VerseHaven

export interface VibeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface VibeGroup {
  id: string;
  name: string;
  description: string;
  categories: VibeCategory[];
}

export const vibeGroups: VibeGroup[] = [
  {
    id: "life-context",
    name: "By Life Context",
    description: "Find verses for what you're going through",
    categories: [
      { id: "hope-encouragement", name: "Hope & Encouragement", description: "For hard days", icon: "🌅", tags: ["hope-encouragement"] },
      { id: "strength-hard-times", name: "Strength in Hard Times", description: "When life is tough", icon: "💪", tags: ["strength-hard-times"] },
      { id: "faith-over-fear", name: "Faith Over Fear", description: "Conquer your fears", icon: "🛡️", tags: ["faith-over-fear"] },
      { id: "peace-calm", name: "Peace & Calm", description: "For anxious hearts", icon: "🕊️", tags: ["peace-calm"] },
      { id: "gods-promises", name: "God's Promises", description: "His faithful word", icon: "📜", tags: ["gods-promises"] },
      { id: "trust-in-god", name: "Trust in God", description: "Let go and trust", icon: "🙏", tags: ["trust-in-god"] },
      { id: "perseverance", name: "Perseverance & Endurance", description: "Keep going", icon: "🏃", tags: ["perseverance"] },
      { id: "healing-restoration", name: "Healing & Restoration", description: "For broken seasons", icon: "💚", tags: ["healing-restoration"] },
    ],
  },
  {
    id: "emotion",
    name: "By Emotion",
    description: "Shop how you feel",
    categories: [
      { id: "comfort", name: "Comfort", description: "Feel embraced", icon: "🤗", tags: ["comfort"] },
      { id: "joy", name: "Joy", description: "Celebrate life", icon: "😊", tags: ["joy"] },
      { id: "courage", name: "Courage", description: "Be bold", icon: "🦁", tags: ["courage"] },
      { id: "gratitude", name: "Gratitude", description: "Count blessings", icon: "🙌", tags: ["gratitude"] },
      { id: "humility", name: "Humility", description: "Walk humbly", icon: "🌿", tags: ["humility"] },
      { id: "confidence-in-christ", name: "Confidence in Christ", description: "Know your identity", icon: "✨", tags: ["confidence-in-christ"] },
      { id: "assurance-security", name: "Assurance & Security", description: "Rest secure", icon: "🔒", tags: ["assurance-security"] },
      { id: "renewal", name: "Renewal", description: "Fresh start", icon: "🌱", tags: ["renewal"] },
    ],
  },
  {
    id: "audience",
    name: "Gift For...",
    description: "Perfect gifts for loved ones",
    categories: [
      { id: "for-students", name: "For Students", description: "Exam season companion", icon: "📚", tags: ["for-students"] },
      { id: "for-professionals", name: "For Professionals", description: "Office inspiration", icon: "💼", tags: ["for-professionals"] },
      { id: "for-families", name: "For Families", description: "Home blessings", icon: "👨‍👩‍👧", tags: ["for-families"] },
      { id: "for-children", name: "For Children", description: "Kids' room decor", icon: "🧒", tags: ["for-children"] },
      { id: "for-couples", name: "For Couples", description: "Love & marriage", icon: "💑", tags: ["for-couples"] },
      { id: "for-parents", name: "For Parents", description: "Parenting strength", icon: "👪", tags: ["for-parents"] },
      { id: "for-pastors", name: "For Pastors & Leaders", description: "Ministry encouragement", icon: "⛪", tags: ["for-pastors"] },
      { id: "for-new-believers", name: "For New Believers", description: "Foundation verses", icon: "🌟", tags: ["for-new-believers"] },
    ],
  },
  {
    id: "occasion",
    name: "By Occasion",
    description: "Celebrate life's moments",
    categories: [
      { id: "birthdays", name: "Birthdays", description: "Birthday blessings", icon: "🎂", tags: ["birthdays"] },
      { id: "weddings", name: "Weddings", description: "Marriage verses", icon: "💒", tags: ["weddings"] },
      { id: "housewarming", name: "Housewarming", description: "New home blessings", icon: "🏡", tags: ["housewarming"] },
      { id: "baptism", name: "Baptism", description: "New life in Christ", icon: "💧", tags: ["baptism"] },
      { id: "confirmation", name: "Confirmation", description: "Faith milestone", icon: "✝️", tags: ["confirmation"] },
      { id: "graduation", name: "Graduation", description: "New beginnings", icon: "🎓", tags: ["graduation"] },
      { id: "christmas", name: "Christmas", description: "Celebrate His birth", icon: "🎄", tags: ["christmas"] },
      { id: "easter", name: "Easter", description: "He is risen", icon: "🐣", tags: ["easter"] },
      { id: "funeral-remembrance", name: "Remembrance", description: "Comfort in loss", icon: "🕯️", tags: ["funeral-remembrance"] },
    ],
  },
  {
    id: "theme",
    name: "By Theme",
    description: "Core biblical themes",
    categories: [
      { id: "love", name: "Love", description: "God's love", icon: "❤️", tags: ["love"] },
      { id: "faith", name: "Faith", description: "Trust and believe", icon: "🙏", tags: ["faith"] },
      { id: "grace", name: "Grace", description: "Unmerited favor", icon: "🌈", tags: ["grace"] },
      { id: "salvation", name: "Salvation", description: "The Gospel", icon: "✝️", tags: ["salvation"] },
      { id: "prayer", name: "Prayer", description: "Communion with God", icon: "🙏", tags: ["prayer"] },
      { id: "worship", name: "Worship", description: "Praise Him", icon: "🎵", tags: ["worship"] },
      { id: "obedience", name: "Obedience", description: "Follow His way", icon: "📖", tags: ["obedience"] },
      { id: "gods-sovereignty", name: "God's Sovereignty", description: "He reigns", icon: "👑", tags: ["gods-sovereignty"] },
      { id: "wisdom", name: "Wisdom", description: "Godly insight", icon: "💡", tags: ["wisdom"] },
    ],
  },
  {
    id: "book",
    name: "By Book",
    description: "Browse by Bible book",
    categories: [
      { id: "psalms", name: "Psalms", description: "Songs of praise", icon: "🎶", tags: ["psalms"] },
      { id: "proverbs", name: "Proverbs", description: "Wisdom sayings", icon: "📜", tags: ["proverbs"] },
      { id: "gospels", name: "Gospels", description: "Matthew to John", icon: "📖", tags: ["gospels"] },
      { id: "pauline-epistles", name: "Pauline Epistles", description: "Paul's letters", icon: "✉️", tags: ["pauline-epistles"] },
      { id: "old-testament-classics", name: "OT Classics", description: "Genesis to Malachi", icon: "📕", tags: ["old-testament-classics"] },
      { id: "new-testament-encouragement", name: "NT Encouragement", description: "Hebrews to Revelation", icon: "📗", tags: ["new-testament-encouragement"] },
    ],
  },
  {
    id: "style",
    name: "By Style",
    description: "Match your aesthetic",
    categories: [
      { id: "minimal-typography", name: "Minimal Typography", description: "Clean & simple", icon: "✏️", tags: ["minimal-typography"] },
      { id: "modern-aesthetic", name: "Modern Aesthetic", description: "Contemporary design", icon: "🎨", tags: ["modern-aesthetic"] },
      { id: "vintage-classic", name: "Vintage Classic", description: "Timeless elegance", icon: "🖼️", tags: ["vintage-classic"] },
      { id: "floral", name: "Floral", description: "Beautiful botanicals", icon: "🌸", tags: ["floral"] },
      { id: "nature-inspired", name: "Nature Inspired", description: "Mountains, seas", icon: "🏔️", tags: ["nature-inspired"] },
      { id: "dark-moody", name: "Dark & Moody", description: "Deep tones", icon: "🌑", tags: ["dark-moody"] },
      { id: "bright-uplifting", name: "Bright & Uplifting", description: "Cheerful colors", icon: "☀️", tags: ["bright-uplifting"] },
      { id: "abstract-artistic", name: "Abstract Artistic", description: "Creative expression", icon: "🎭", tags: ["abstract-artistic"] },
    ],
  },
  {
    id: "placement",
    name: "By Room",
    description: "Perfect for every space",
    categories: [
      { id: "bedroom", name: "Bedroom", description: "Rest & peace", icon: "🛏️", tags: ["bedroom"] },
      { id: "living-room", name: "Living Room", description: "Family gathering", icon: "🛋️", tags: ["living-room"] },
      { id: "prayer-room", name: "Prayer Room", description: "Quiet place", icon: "🕯️", tags: ["prayer-room"] },
      { id: "office-study", name: "Office / Study", description: "Work inspiration", icon: "🖥️", tags: ["office-study"] },
      { id: "church-fellowship", name: "Church / Fellowship", description: "Community space", icon: "⛪", tags: ["church-fellowship"] },
      { id: "kids-room", name: "Kids' Room", description: "For little ones", icon: "🧸", tags: ["kids-room"] },
      { id: "dorm-hostel", name: "Dorm / Hostel", description: "Student life", icon: "🏠", tags: ["dorm-hostel"] },
    ],
  },
];

// Quick access to popular vibes for homepage
export const featuredVibes = [
  vibeGroups[0].categories[0], // Hope & Encouragement
  vibeGroups[0].categories[3], // Peace & Calm
  vibeGroups[0].categories[1], // Strength in Hard Times
  vibeGroups[0].categories[2], // Faith Over Fear
  vibeGroups[1].categories[1], // Joy
  vibeGroups[1].categories[2], // Courage
];

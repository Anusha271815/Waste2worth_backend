require('dotenv').config(); // load .env variables
const mongoose = require("mongoose");
const Idea = require("./models/idea"); // your Mongoose model

// 1️⃣ Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // exit if connection fails
  }
}


const demoIdeas = [
  {
    material: "plastic",
    ideas: [
      "Make flower pots from plastic bottles",
      "Create storage containers from plastic jars",
      "Build a vertical garden using plastic bottles"
    ]
  },
  {
    material: "glass",
    ideas: [
      "Turn glass bottles into lamps",
      "Use glass jars for kitchen storage",
      "Create decorative planters from glass bottles"
    ],
  },{
  material: "mobile phones (E-waste)",
  ideas: [
    "Convert old smartphones into smart home controllers",
    "Use as a digital photo frame or music player",
    "Turn into a DIY security camera using apps",
    "Donate working phones to recycling or charity programs",
    "Extract parts for tech art or teaching electronics"
  ],
},
  {
    material: "paper",
    ideas: [
      "Create paper baskets for decoration",
      "Make handmade paper from waste paper",
      "Craft paper flowers and wall art"
    ]
  },
    {
    material: "metal",
    ideas: [
      "Make pen stands from tin cans",
      "Create garden tools from scrap metal",
      "Turn old metal into rustic home decor"
    ]
  },
  {
    material: "wood",
    ideas: [
      "Build small furniture from old wooden pallets",
      "Create wall shelves from scrap wood",
      "Design rustic photo frames using wood pieces"
    ]
  },
  {
    material: "fabric",
    ideas: [
      "Make tote bags from old jeans",
      "Create cushion covers using old shirts",
      "Design patchwork quilts from scrap fabric"
    ]
  },
  {
    material: "cardboard",
    ideas: [
      "Create organizers and drawers from cardboard boxes",
      "Build a phone stand using cardboard",
      "Make mini shelves for desk storage"
    ]
  },
  {
    material: "electronics",
    ideas: [
      "Turn old CDs into decorative mirrors",
      "Use circuit boards for art pieces or jewelry",
      "Make keychains from old computer parts"
    ]
  },
  {
    material: "rubber",
    ideas: [
      "Turn old tires into garden seats",
      "Make planters from used tires",
      "Create playground swings using rubber tubes"
    ]
  },
  {
    material: "ceramic",
    ideas: [
      "Use broken ceramic pieces for mosaic art",
      "Turn old cups into candle holders",
      "Create wall hangings from cracked plates"
    ]
  },

  // New / extra entries:
  {
    material: "mobile phone",
    ideas: [
      "Use old mobile phone as a security camera (with apps)",
      "Turn phone screen into a digital photo frame",
      "Make a mini fan using phone’s vibration motor"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=0P8-MLVJYoA",  // generic electronics upcycling
      "https://www.youtube.com/watch?v=YUEKZqUd8j4",
      "https://www.youtube.com/watch?v=zNHDbXAmY_0"
    ]
  },
  {
    material: "earbuds",
    ideas: [
      "Convert broken earbuds into magnetic keychains",
      "Use earbuds wires to make bracelets or wire art",
      "Turn earbud shells into tiny plant pots or diorama shells"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=fSf6KB4WqX4",  // Broken Cheap Earbuds can be This Useful!
      "https://www.youtube.com/watch?v=hFro394K-xo",  // DIY Basket from earbuds
      "https://www.youtube.com/watch?v=zNHDbXAmY_0"   // transformed into speaker
    ]
  },
  {
    material: "charger / adapter",
    ideas: [
      "Use adapter casing for small storage box",
      "Turn cable into decorative rope or bracelet",
      "Use wires for art wiring or lighting decor"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=lcQORAKc090", // E-Buddy from old earphones (similar concept)
      "https://www.youtube.com/watch?v=myXlTWPtj8c", // reuse idea earphones
      "https://www.youtube.com/watch?v=coxOh7bhKuY"  // crafts with electronics
    ]
  },
  {
  material: "laptops and computers (E-waste)",
  ideas: [
    "Convert an old laptop into a home media server",
    "Use screens to build DIY smart mirrors",
    "Repurpose hard drives as external storage",
    "Turn old CPU cases into planters or lamps",
    "Donate functional parts for reuse or repair programs"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=jDLxw7nYivY",
    "https://www.youtube.com/watch?v=E6D4XKQ3PNo",
    "https://www.youtube.com/watch?v=0d6uF4YvC2Q",
    "https://www.youtube.com/watch?v=9N5bN9j7EjA",
    "https://www.youtube.com/watch?v=HcVfSmvAM4Y"
  ]
}
,
  {
    material: "circuit board / PCB",
    ideas: [
      "Mount PCB as wall art or coasters",
      "Cut small pieces to make jewelry pendants",
      "Embed PCB pieces in resin to make coasters"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=0P8-MLVJYoA",
      "https://www.youtube.com/watch?v=YbG1T3ZmHz4",
      "https://www.youtube.com/watch?v=YUEKZqUd8j4"
    ]
  },
  {
    material: "laptop parts",
    ideas: [
      "Use old laptop keyboard keys for custom art or jewelry",
      "Turn hard drive platters into clocks",
      "Use laptop hinge and strips for industrial decor"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=0P8-MLVJYoA",
      "https://www.youtube.com/watch?v=YUEKZqUd8j4",
      "https://www.youtube.com/watch?v=YbG1T3ZmHz4"
    ]
  },
  {
    material: "glass (window panes)",
    ideas: [
      "Use broken glass for mosaic tables",
      "Turn glass shards into suncatchers or stained glass",
      "Frame small shards for decorative wall art"
    ],
  },
  {
    material: "metal (aluminum cans)",
    ideas: [
      "Make lanterns from soda cans",
      "Create wall art by cutting can shapes",
      "Use can bottoms as plant saucers"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=w8BjeMryJFc",
      "https://www.youtube.com/watch?v=FwONsOPl5tM",
      "https://www.youtube.com/watch?v=1qHViJgU4BY"
    ]
  },
  {
    material: "textile (denim)",
    ideas: [
      "Make wallets from old jeans",
      "Create rugs using fabric strips",
      "Design tote bags or patches"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=gjJjxz4RPLU",
      "https://www.youtube.com/watch?v=1An2ONpyvUk",
      "https://www.youtube.com/watch?v=lf1tbXjxiPI"
    ]
  },
  {
  material: "cables and chargers (E-waste)",
  ideas: [
    "Make DIY cable holders or wall art from old wires",
    "Reuse copper wires in craft projects",
    "Create bracelets or decor items from cable sheaths",
    "Organize cables using upcycled tubing",
    "Recycle plastic and metal parts separately"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=Q0Y_hD0p0Yk",
    "https://www.youtube.com/watch?v=rD1jQW9oBt8",
    "https://www.youtube.com/watch?v=F1K1Vv0vJUI",
    "https://www.youtube.com/watch?v=IoE9ZqzFFxg",
    "https://www.youtube.com/watch?v=cg9QF0vF3x0"
  ]
},
  {
    material: "glass (mirrors)",
    ideas: [
      "Use broken mirror pieces for mosaic frames",
      "Create a mirror collage wall art",
      "Make mirror coasters from shards"
    ],
  },
  {
    material: "plastic (caps & lids)",
    ideas: [
      "Design decorative wall art using bottle caps",
      "Make coasters from plastic lids",
      "Create mosaic frames with colored caps"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=2m-6iMmkxjE",
      "https://www.youtube.com/watch?v=emQ2kRsl_TA",
      "https://www.youtube.com/watch?v=R6xocYNyGXE"
    ]
  },
  {
    material: "styrofoam / foam",
    ideas: [
      "Use foam pieces for lightweight sculptures",
      "Make 3D letters and signage from foam",
      "Create packing vases or models from foam"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=cJ857wjVBrk",
      "https://www.youtube.com/watch?v=R6xocYNyGXE",
      "https://www.youtube.com/watch?v=g_4Xs429JII"
    ]
  },
  {
    material: "rubber (gloves, tubes)",
    ideas: [
      "Make stamps from rubber gloves",
      "Use rubber tubes for flexible planters",
      "Create elastic bands or flexible connectors"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=sr3cNqOQpBM",
      "https://www.youtube.com.watch?v=9khJMEUzfSw",  // note: slight error, check manually
      "https://www.youtube.com/watch?v=VdjfQf7dPqI"
    ]
  },
  {
  material: "garden waste (Organic)",
  ideas: [
    "Create nutrient-rich compost from leaves and grass",
    "Make mulch to retain soil moisture",
    "Use dry twigs for biochar or fire starters",
    "Build decorative baskets from dried vines",
    "Turn leaves into eco-friendly paper or art"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=CB8R3q3EJ8s",
    "https://www.youtube.com/watch?v=pMb8cYpAoUc",
    "https://www.youtube.com/watch?v=8E7ZqR4jWqg",
    "https://www.youtube.com/watch?v=b7lZ1UT7p9E",
    "https://www.youtube.com/watch?v=dFSgJglbHq0"
  ]
},
  {
    material: "ceramic (tiles)",
    ideas: [
      "Make mosaic tabletop using broken ceramic tiles",
      "Use tile shards for decorative stepping stones",
      "Create coasters or trivets from tile pieces"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=4zuw3EJBBn0",
      "https://www.youtube.com/watch?v=3swxx1H4ZMg",
      "https://www.youtube.com/watch?v=R5s9-3eY7xU"
    ]
  },
  {
    material: "glass (wine bottles)",
    ideas: [
      "Cut wine bottles to make drinking glasses",
      "Use bottle bottoms as candle holders",
      "Turn bottles into wind chimes or decorations"
    ],
  },
  {
  material: "coffee and tea waste (Organic)",
  ideas: [
    "Use coffee grounds as natural fertilizer or pest repellent",
    "Make body scrub using coffee or tea residue",
    "Deodorize refrigerators using dried coffee waste",
    "Use tea leaves in compost for added nitrogen",
    "Dye fabric naturally using tea or coffee"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=4QxU8Fsw4vA",
    "https://www.youtube.com/watch?v=rQO9vGVZBGc",
    "https://www.youtube.com/watch?v=Spb0lT9PV-U",
    "https://www.youtube.com/watch?v=4kWv8t0YI7A",
    "https://www.youtube.com/watch?v=58M1i7ldX2A"
  ]
}
,
  {
    material: "paperboard / cereal boxes",
    ideas: [
      "Use cereal boxes to make magazine holders",
      "Cut and fold into desk organizers",
      "Make decorative gift boxes"
    ]
  },
  {
    material: "glass (light bulbs)",
    ideas: [
      "Use burnt-out bulbs as mini terrariums",
      "Convert bulbs into hanging decorations",
      "Turn bulbs into salt & pepper shakers"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=Epd3t8nRDAw",
      "https://www.youtube.com/watch?v=5EbYCr1l8FA",
      "https://www.youtube.com/watch?v=FZTq8ETsVFM"
    ]
  },
  {
  material: "coconut shells (Organic)",
  ideas: [
    "Make planters or bowls from coconut shells",
    "Use husk fibers to create natural scrubbers",
    "Turn shells into eco-friendly candle holders",
    "Craft decorative lamps or jewelry",
    "Make charcoal briquettes from coconut shells"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=JdI_5yDdk3A",
    "https://www.youtube.com/watch?v=2CwqlUmnOeA",
    "https://www.youtube.com/watch?v=ffoLgAq2D8s",
    "https://www.youtube.com/watch?v=ZcVqozvIvH8",
    "https://www.youtube.com/watch?v=4-RhQXbNfj8"
  ]
},
  {
  material: "earphones and audio devices (E-waste)",
  ideas: [
    "Turn broken headphones into fashion accessories",
    "Use parts for STEM learning or art installations",
    "Convert old speakers into Bluetooth speakers",
    "Create small planters or holders using headphone casings",
    "Donate working sets to NGOs"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=sapbWc4zPqk",
    "https://www.youtube.com/watch?v=Yx5bhsP8Woc",
    "https://www.youtube.com/watch?v=PtHapvQSnNI",
    "https://www.youtube.com/watch?v=Z5VwzYDwEOM",
    "https://www.youtube.com/watch?v=H5dVnMKr8YQ"
  ]
},
  {
    material: "plastic (shampoo bottles)",
    ideas: [
      "Cut into funnels or scoops",
      "Use for drip irrigation in gardens",
      "Make a bird feeder"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=2m-6iMmkxjE",
      "https://www.youtube.com/watch?v=emQ2kRsl_TA",
      "https://www.youtube.com/watch?v=R6xocYNyGXE"
    ]
  },
  {
    material: "metal (screws, nuts, bolts)",
    ideas: [
      "Make wind chimes using nuts & bolts",
      "Glue into mosaic art for texture",
      "Form small sculptures or wall art"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=w8BjeMryJFc",
      "https:// come_back_to_valid_link"  // placeholder
    ]
  },
  {
    material: "electronics (USB sticks)",
    ideas: [
      "Use USB shell as tiny storage box",
      "Turn USB circuit into pendants",
      "Embed USB parts into resin keychains"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=0P8-MLVJYoA",
      "https://www.youtube.com/watch?v=YUEKZqUd8j4",
      "https://www.youtube.com/watch?v=YbG1T3ZmHz4"
    ]
  },
  {
    material: "electronics (old keyboard)",
    ideas: [
      "Make keychains or magnets from keys",
      "Use keyboard frame as photo frame",
      "Create wall art from arranged keys"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=0P8-MLVJYoA",
      "https://www.youtube.com/watch?v=YbG1T3ZmHz4",
      "https://www.youtube.com/watch?v=YUEKZqUd8j4"
    ]
  },
  {
  material: "batteries",
  ideas: [
    "Use old batteries for DIY low-power projects (with caution)",
    "Upcycle casing into miniature decor items",
    "Collect and recycle through authorized e-waste programs",
    "Educate others on safe disposal and recycling of lithium batteries",
    "Create awareness models for battery chemistry"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=f03TLbqJttQ",
    "https://www.youtube.com/watch?v=k8ubx8iQ6jw",
    "https://www.youtube.com/watch?v=XjW-5c5DqfQ",
    "https://www.youtube.com/watch?v=t1j4kZfV3lI",
    "https://www.youtube.com/watch?v=JvTvGmJBlLw"
  ]
},{
  material: "food waste (Organic)",
  ideas: [
    "Make compost from fruit and vegetable scraps",
    "Create bio-enzyme cleaner from citrus peels",
    "Use leftover rice or bread for natural face masks",
    "Repurpose stale bread into bird feed",
    "Grow plants using kitchen waste fertilizers"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=aZUCxBHeq04",
    "https://www.youtube.com/watch?v=5y8dGdfXxB0",
    "https://www.youtube.com/watch?v=O7zLP8z0POI",
    "https://www.youtube.com/watch?v=J3K6K_xlV0Y",
    "https://www.youtube.com/watch?v=ZV5dLdX8rHo"
  ]
}
,
  {
    material: "plastic (PVC pipes)",
    ideas: [
      "Use cut pipes to make pen organizers",
      "Construct small shelves or racks",
      "Make curtain rods or plant supports"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=g_4Xs429JII",
      "https://www.youtube.com/watch?v=A9gedaTlU2w",
      "https://www.youtube.com/watch?v=1MvbNwmqDvY"
    ]
  },
  {
    material: "glass (beverage bottles)",
    ideas: [
      "Paint and hang as outdoor lamps",
      "Use as self-watering planters",
      "Decorate with etching / engraving"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=Epd3t8nRDAw",
      "https://www.youtube.com/watch?v=5EbYCr1l8FA",
      "https://www.youtube.com/watch?v=FZTq8ETsVFM"
    ]
  },
  {
    material: "metal (sheet scraps)",
    ideas: [
      "Cut into decorative wall plates",
      "Make bookmarks or custom shapes",
      "Use as backing plates in art"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=w8BjeMryJFc",
      "https://www.youtube.com/watch?v=FwONsOPl5tM",
      "https://www.youtube.com/watch?v=1qHViJgU4BY"
    ]
  },
  {
    material: "wood (scrap plywood)",
    ideas: [
      "Cut into coasters or cutting boards",
      "Build small planters or boxes",
      "Create decorative wall panels"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=I4m7Y1szJqQ",
      "https://www.youtube.com/watch?v=qlvZq8h_LzY",
      "https://www.youtube.com/watch?v=Vg2U7k3WsmA"
    ]
  },
  {
    material: "fabric (old curtains)",
    ideas: [
      "Convert into table runners or mats",
      "Use as lining for bags or cushions",
      "Patchwork collage wall hangings"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=gjJjxz4RPLU",
      "https://www.youtube.com/watch?v=1An2ONpyvUk",
      "https://www.youtube.com/watch?v=lf1tbXjxiPI"
    ]
  },
  {
    material: "paper (magazines)",
    ideas: [
      "Roll pages into baskets or coasters",
      "Make paper beads for jewelry",
      "Collage wall art with cut-outs"
    ]
  },
  {
    material: "glass (jars)",
    ideas: [
      "Paint jars for DIY lanterns",
      "Use jars as storage with custom lids",
      "Create terrariums inside jars"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=Epd3t8nRDAw",
      "https://www.youtube.com/watch?v=5EbYCr1l8FA",
      "https://www.youtube.com/watch?v=FZTq8ETsVFM"
    ]
  },
  {
    material: "plastic (grocery bags)",
    ideas: [
      "Weave into reusable shopping bags",
      "Turn into braided mats or baskets",
      "Use as stuffing for cushions"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=2m-6iMmkxjE",
      "https://www.youtube.com/watch?v=emQ2kRsl_TA",
      "https://www.youtube.com/watch?v=R6xocYNyGXE"
    ]
  },
  {
    material: "metal (old tools)",
    ideas: [
      "Repurpose into sculptural hangers",
      "Convert handles into decorative rods",
      "Make wall-mounted tool art"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=w8BjeMryJFc",
      "https://www.youtube.com/watch?v=FwONsOPl5tM",
      "https://www.youtube.com/watch?v=1qHViJgU4BY"
    ]
  },
  {
    material: "electronics (old cameras)",
    ideas: [
      "Convert camera into decorative vintage prop",
      "Use lens as terrarium lid",
      "Make camera body into a box or storage"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=0P8-MLVJYoA",
      "https://www.youtube.com/watch?v=YbG1T3ZmHz4",
      "https://www.youtube.com/watch?v=YUEKZqUd8j4"
    ]
  },
  {
    material: "textile (sarees / scarves)",
    ideas: [
      "Make braided rugs or mats",
      "Patch into wall hangings",
      "Use as decorative throws or tapestries"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=gjJjxz4RPLU",
      "https://www.youtube.com/watch?v=1An2ONpyvUk",
      "https://www.youtube.com/watch?v=lf1tbXjxiPI"
    ]
  },
  {
    material: "plastic (CD cases)",
    ideas: [
      "Use covers as photo frames",
      "Turn into clear boxes for storage",
      "Create mini display shelves from cases"
    ],
    videoLinks: [
      "https://www.youtube.com/watch?v=2m-6iMmkxjE",
      "https://www.youtube.com/watch?v=g_4Xs429JII",
      "https://www.youtube.com/watch?v=R6xocYNyGXE"
    ]
  },
  {
  material: "garden waste (Organic)",
  ideas: [
    "Create nutrient-rich compost from leaves and grass",
    "Make mulch to retain soil moisture",
    "Use dry twigs for biochar or fire starters",
    "Build decorative baskets from dried vines",
    "Turn leaves into eco-friendly paper or art"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=CB8R3q3EJ8s",
    "https://www.youtube.com/watch?v=pMb8cYpAoUc",
    "https://www.youtube.com/watch?v=8E7ZqR4jWqg",
    "https://www.youtube.com/watch?v=b7lZ1UT7p9E",
    "https://www.youtube.com/watch?v=dFSgJglbHq0"
  ]
},
  {
    material: "glass (test tubes)",
    ideas: [
      "Use as vases or bud holders",
      "Embed in wood base for decorative piece",
      "Hang as narrow glass pendants"
    ],
  },
  {
  material: "food waste (Organic)",
  ideas: [
    "Make compost from fruit and vegetable scraps",
    "Create bio-enzyme cleaner from citrus peels",
    "Use leftover rice or bread for natural face masks",
    "Repurpose stale bread into bird feed",
    "Grow plants using kitchen waste fertilizers"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=aZUCxBHeq04",
    "https://www.youtube.com/watch?v=5y8dGdfXxB0",
    "https://www.youtube.com/watch?v=O7zLP8z0POI",
    "https://www.youtube.com/watch?v=J3K6K_xlV0Y",
    "https://www.youtube.com/watch?v=ZV5dLdX8rHo"
  ]
},
 {
  material: "food waste (Organic)",
  ideas: [
    "Make compost from fruit and vegetable scraps",
    "Create bio-enzyme cleaner from citrus peels",
    "Use leftover rice or bread for natural face masks",
    "Repurpose stale bread into bird feed",
    "Grow plants using kitchen waste fertilizers"
  ],
  videoLinks: [
    "https://www.youtube.com/watch?v=aZUCxBHeq04",
    "https://www.youtube.com/watch?v=5y8dGdfXxB0",
    "https://www.youtube.com/watch?v=O7zLP8z0POI",
    "https://www.youtube.com/watch?v=J3K6K_xlV0Y",
    "https://www.youtube.com/watch?v=ZV5dLdX8rHo"
  ]
}

  // You can continue adding more up to 50 or more entries similarly …
];
// 3️⃣ Seed database
async function seedDatabase() {
  try {
    await Idea.deleteMany({}); // clear existing data
    await Idea.insertMany(demoIdeas); // insert demo data
    console.log("✅ Demo data inserted successfully!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    mongoose.connection.close(); // close DB connection
  }
}

// 4️⃣ Run everything
(async () => {
  await connectDB();
  await seedDatabase();
})();
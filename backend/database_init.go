package main

import (
	"log"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDatabase() {
	var err error

	DB, err = gorm.Open(sqlite.Open("file:computear.db?_pragma=foreign_keys(1)"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected")

	DB.AutoMigrate(&Device{}, &Category{}, &Era{})
	log.Println("Database migration completed")

	SeedData()
}

func SeedData() {
	var count int64
	DB.Model(&Device{}).Count(&count)

	if count > 0 {
		log.Println("Data already exists")
		return
	}

	log.Println("Seeding database...")

	categories := []Category{
		{Name: "Mainframe", Description: "Large computers", Icon: "🖥️"},
		{Name: "Personal Computer", Description: "Desktop", Icon: "💻"},
		{Name: "Laptop", Description: "Portable", Icon: "💼"},
	}
	DB.Create(&categories)

	eras := []Era{
		{Name: "1940s", StartYear: 1940, EndYear: 1949},
		{Name: "1970s", StartYear: 1970, EndYear: 1979},
		{Name: "1980s", StartYear: 1980, EndYear: 1989},
	}
	DB.Create(&eras)

	devices := []Device{
		{
			Name:         "ENIAC",
			Year:         1945,
			Category:     "Mainframe",
			Era:          "1940s",
			Manufacturer: "University of Pennsylvania",
			Description:  "Electronic Numerical Integrator and Computer",
			Impact:       "First general-purpose electronic computer",
			Weight:       "30 ton",
			Power:        "150 kW",
			ImageURL:     "/images/eniac.png",
			Featured:     true,
		},
		{
			Name:         "IBM System/360",
			Year:         1964,
			Category:     "Mainframe",
			Era:          "1960s",
			Manufacturer: "IBM",
			Description:  "Keluarga komputer mainframe revolusioner",
			Impact:       "Mendefinisikan standar mainframe",
			Processor:    "IBM 360",
			Memory:       "8 KB - 8 MB",
			Storage:      "Tape & Disk",
			Price:        "$250,000 - $5 juta",
			ImageURL:     "/images/ibm-360.png",
			Featured:     true,
		},
		{
			Name:         "Apple II",
			Year:         1977,
			Category:     "Personal Computer",
			Era:          "1970s",
			Manufacturer: "Apple Computer",
			Description:  "PC pertama dengan grafis berwarna",
			Impact:       "Membawa komputer ke rumah-rumah",
			Processor:    "MOS 6502 @ 1 MHz",
			Memory:       "4 KB",
			Price:        "$1,298",
			ImageURL:     "/images/apple-ii.png",
			ModelURL:     "/models/apple-ii.glb",
			Featured:     true,
		},
		{
			Name:         "Commodore 64",
			Year:         1982,
			Category:     "Home Computer",
			Era:          "1980s",
			Manufacturer: "Commodore",
			Description:  "Komputer pribadi terlaris sepanjang masa",
			Impact:       "Terjual 17 juta unit",
			Processor:    "MOS 6510 @ 1 MHz",
			Memory:       "64 KB",
			Price:        "$595",
			ImageURL:     "/images/commodore-64.png",
			ModelURL:     "/models/commodore-64.glb",
			Featured:     false,
		},
		{
			Name:         "IBM PC 5150",
			Year:         1981,
			Category:     "Personal Computer",
			Era:          "1980s",
			Manufacturer: "IBM",
			Description:  "PC yang mendefinisikan standar industri",
			Impact:       "Menciptakan standar PC",
			Processor:    "Intel 8088 @ 4.77 MHz",
			Memory:       "16 KB - 256 KB",
			Price:        "$1,565",
			ImageURL:     "/images/ibm-pc.png",
			ModelURL:     "/models/ibm-pc.glb",
			Featured:     true,
		},
		{
			Name:         "MacBook (Intel)",
			Year:         2006,
			Category:     "Laptop",
			Era:          "2000s",
			Manufacturer: "Apple Inc.",
			Description:  "Laptop pertama Apple dengan processor Intel",
			Impact:       "Transisi Apple ke arsitektur x86",
			Processor:    "Intel Core Duo",
			Memory:       "512 MB - 2 GB",
			Weight:       "2.36 kg",
			ImageURL:     "/images/macbook.png",
			ModelURL:     "/models/macbook.glb",
			Featured:     false,
		},
	}
	DB.Create(&devices)

	log.Println("Database seeded!")
}

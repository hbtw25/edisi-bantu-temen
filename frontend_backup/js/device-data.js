// device-data.js - Database komputer

const deviceDatabase = {
    // ENIAC - No Model
    'eniac': {
        id: 'eniac',
        name: 'ENIAC',
        manufacturer: 'University of Pennsylvania',
        year: 1945,
        era: '1940s',
        category: 'Komputer Elektronik Pertama',
        status: 'Historic',
        image_url: '/images/eniac.png',
        description: 'Electronic Numerical Integrator and Computer (ENIAC) adalah komputer elektronik digital pertama yang dapat diprogram ulang untuk menyelesaikan berbagai masalah komputasi. Dibangun pada tahun 1945, ENIAC menggunakan 17,468 vacuum tubes dan memiliki berat sekitar 30 ton.',
        context: 'ENIAC dikembangkan untuk menghitung tabel tembakan artileri untuk Ballistic Research Laboratory Angkatan Darat AS selama Perang Dunia II. Meskipun terlambat untuk digunakan dalam perang, ENIAC membuktikan konsep komputer elektronik digital yang dapat diprogram dan membuka era baru dalam komputasi.',
        impact: 'ENIAC adalah milestone penting dalam sejarah komputer modern. Meskipun bukan komputer pertama, ENIAC adalah yang pertama fully electronic dan general-purpose. Teknologi vacuum tube yang digunakan ENIAC menjadi dasar komputer generasi pertama dan menginspirasi pengembangan komputer di seluruh dunia.',
        specs: {
            'Kecepatan': '~5,000 operasi/detik',
            'Memory': '20 × 10-digit registers',
            'Berat': '30 ton (27,000 kg)',
            'Daya': '150 kW',
            'Vacuum Tubes': '17,468 tubes',
            'Ukuran': '30 × 50 kaki (room-sized)',
            'Biaya': '$487,000 USD (1945)'
        },
        modelPath: null,
        timelinePosition: 6.25,
        hasModel: false
    },

    // IBM 360 - No Model
    'ibm360': {
        id: 'ibm360',
        name: 'IBM System/360',
        manufacturer: 'IBM',
        year: 1964,
        era: '1960s',
        category: 'Mainframe Computer',
        status: 'Historic',
        image_url: '/images/ibm-360.png',
        description: 'IBM System/360 adalah keluarga komputer mainframe yang merevolusi industri dengan konsep "computer family" - satu arsitektur yang bisa scale dari small business hingga large enterprise. Ini adalah proyek teknologi terbesar di masanya dengan investasi $5 miliar, setara dengan Manhattan Project.',
        context: 'Diluncurkan pada 7 April 1964, System/360 adalah taruhan besar IBM yang mengubah seluruh lini produknya. Nama "360" melambangkan 360 derajat - mencakup semua kebutuhan computing. Ini adalah komputer pertama yang menggunakan arsitektur konsisten di berbagai model, memungkinkan software berjalan di semua varian.',
        impact: 'System/360 mendefinisikan industri mainframe dan konsep backward compatibility yang masih digunakan hingga sekarang. Banyak konsep modern seperti byte (8-bit), hexadecimal, dan standardisasi peripheral berasal dari System/360. Arsitektur ini masih hidup dalam mainframe IBM modern (z/Architecture).',
        specs: {
            'Arsitektur': '32-bit word, byte-addressable',
            'Memory': '8 KB - 8 MB (tergantung model)',
            'Storage': 'Magnetic tape, disk packs',
            'Kecepatan': '0.034 - 1.7 MIPS',
            'Teknologi': 'Hybrid circuit modules (SLT)',
            'OS': 'OS/360, DOS/360',
            'Harga': '$133,000 - $5.5 juta USD'
        },
        modelPath: null,
        timelinePosition: 30,
        hasModel: false
    },

    // Apple II - Has Model (Path ke Backend)
    'appleii': {
        id: 'appleii',
        name: 'Apple II',
        manufacturer: 'Apple Computer',
        year: 1977,
        era: '1970s',
        category: 'Personal Computer',
        status: 'Historic',
        image_url: '/images/apple-ii.png',
        description: 'Apple II adalah salah satu komputer pribadi pertama yang diproduksi secara massal dan sukses secara komersial. Dirancang oleh Steve Wozniak, komputer ini memiliki keyboard built-in dan mendukung grafik berwarna, yang merupakan terobosan besar di masa itu.',
        context: 'Diluncurkan pada April 1977, Apple II menjadi salah satu komputer yang mendefinisikan era komputer pribadi. Kesuksesannya membantu Apple Computer menjadi perusahaan besar dan membuka jalan bagi revolusi komputer pribadi di tahun 1980-an. Komputer ini sangat populer di sekolah-sekolah Amerika, menciptakan generasi pertama yang tumbuh dengan komputer.',
        impact: 'Apple II memiliki dampak besar pada industri komputer, pendidikan, dan bisnis. Ini adalah komputer pertama yang berhasil menembus pasar konsumen rumahan dan menjadi standar de facto di sekolah-sekolah Amerika. Program VisiCalc (spreadsheet pertama) yang berjalan di Apple II mengubah cara bisnis bekerja dan membuktikan bahwa PC bukan hanya mainan.',
        specs: {
            'Processor': 'MOS Technology 6502 @ 1 MHz',
            'RAM': '4 KB - 48 KB',
            'Storage': 'Cassette tape, optional floppy disk',
            'Display': '40×24 text, 280×192 hi-res graphics',
            'Warna': '6 colors (hi-res), 16 colors (lo-res)',
            'Berat': '5.5 kg',
            'Harga': '$1,298 USD (1977)'
        },
        modelPath: '/models/apple-ii.glb',
        timelinePosition: 46.25,
        hasModel: true
    },
    
    // Commodore 64 - Has Model (Path ke Backend)
    'c64': {
        id: 'c64',
        name: 'Commodore 64',
        manufacturer: 'Commodore International',
        year: 1982,
        era: '1980s',
        category: 'Home Computer',
        status: 'Historic',
        image_url: '/images/commodore-64.png',
        description: 'Commodore 64 (C64) adalah komputer rumahan 8-bit yang diperkenalkan pada Januari 1982. Dengan harga terjangkau ($595) dan kemampuan grafis serta audio yang superior untuk masanya, C64 menjadi komputer terlaris sepanjang masa dengan penjualan sekitar 17 juta unit menurut Guinness World Records.',
        context: 'C64 mendominasi pasar komputer rumahan di pertengahan hingga akhir tahun 1980-an. Chip audio SID yang revolusioner dan kemampuan grafis VIC-II membuatnya menjadi platform gaming yang luar biasa. Banyak game legendaris seperti Impossible Mission, The Last Ninja, dan Maniac Mansion lahir di platform ini. Demo scene C64 menjadi awal dari creative coding dan digital art.',
        impact: 'Commodore 64 memainkan peran penting dalam demokratisasi komputing dan membuka era game komputer rumahan. Platform ini melahirkan generasi pertama programmer dan game developer profesional. Bahkan hingga sekarang, komunitas C64 masih sangat aktif mengembangkan software baru, membuat musik dengan SID chip, dan mengadakan demo party.',
        specs: {
            'Processor': 'MOS Technology 6510 @ 1.023 MHz',
            'RAM': '64 KB',
            'ROM': '20 KB (BASIC, KERNAL)',
            'Graphics': 'VIC-II chip, 320×200 pixels',
            'Sound': 'SID chip (3 voice synthesizer)',
            'Storage': 'Cassette tape / 1541 Floppy disk',
            'Harga': '$595 USD (1982)'
        },
        modelPath: '/models/commodore-64.glb',
        timelinePosition: 52.5,
        hasModel: true
    },
    
    // IBM PC - Has Model (Path ke Backend)
    'ibmpc': {
        id: 'ibmpc',
        name: 'IBM PC 5150',
        manufacturer: 'IBM',
        year: 1981,
        era: '1980s',
        category: 'Personal Computer',
        status: 'Historic',
        image_url: '/images/ibm-pc.png',
        description: 'IBM Personal Computer (IBM PC) model 5150 adalah komputer yang menetapkan standar industri PC hingga saat ini. Diluncurkan pada 12 Agustus 1981, komputer ini menggunakan arsitektur terbuka yang memungkinkan vendor lain membuat komponen dan software yang kompatibel, menciptakan ekosistem yang sangat besar.',
        context: 'Masuknya IBM, perusahaan komputer mainframe terbesar, ke pasar PC memberikan legitimasi pada industri komputer pribadi yang sebelumnya dianggap sebagai hobby. Keputusan IBM untuk menggunakan arsitektur terbuka (bukan proprietary seperti Apple) menciptakan standar de facto. Komputer "IBM-compatible" atau "PC clone" bermunculan, mempercepat adopsi PC di dunia bisnis.',
        impact: 'IBM PC menetapkan standar de facto untuk komputer pribadi yang masih kita gunakan hingga sekarang. Arsitektur x86 dari Intel dan sistem operasi MS-DOS yang digunakan IBM PC menjadi dasar dari hampir semua PC modern. Istilah "PC" sendiri menjadi sinonim untuk komputer pribadi. Keputusan IBM menggunakan DOS dari Microsoft juga mengubah Microsoft dari perusahaan kecil menjadi raksasa teknologi.',
        specs: {
            'Processor': 'Intel 8088 @ 4.77 MHz',
            'RAM': '16 KB (expandable to 256 KB)',
            'ROM': '40 KB (BIOS, BASIC)',
            'Storage': 'Optional 5.25" floppy drive (160-320 KB)',
            'Display': 'Monochrome atau CGA color',
            'Expansion': '5 expansion slots',
            'OS': 'PC DOS 1.0 / MS-DOS',
            'Harga': '$1,565 USD (base model)'
        },
        modelPath: '/models/ibm-pc.glb',
        timelinePosition: 51.25,
        hasModel: true
    },
    
    // MacBook - Has Model (Path ke Backend)
    'macbook': {
        id: 'macbook',
        name: 'MacBook (Intel)',
        manufacturer: 'Apple Inc.',
        year: 2006,
        era: '2000s',
        category: 'Laptop',
        status: 'Modern',
        image_url: '/images/macbook.png',
        description: 'MacBook pertama yang menggunakan processor Intel menandai transisi bersejarah Apple dari PowerPC ke arsitektur x86. Diluncurkan pada Januari 2006 di Macworld Conference, ini adalah momen penting karena Mac kini bisa menjalankan software Windows dan Mac OS X secara native.',
        context: 'Transisi ke Intel dimulai pada WWDC 2005 ketika Steve Jobs mengumumkan perpindahan dari processor PowerPC ke Intel. Keputusan ini mengejutkan industri karena Apple selama puluhan tahun menggunakan PowerPC dan bahkan pernah mengkritik Intel. Dengan teknologi Boot Camp, pengguna bisa dual-boot Mac OS X dan Windows, menghilangkan salah satu hambatan terbesar adopsi Mac.',
        impact: 'Transisi ke Intel membuat Mac lebih kompetitif dalam hal performa dan kompatibilitas software. Banyak profesional yang sebelumnya ragu beralih ke Mac karena sekarang bisa menjalankan Windows untuk aplikasi spesifik. Era Intel Mac berlangsung hingga 2020 ketika Apple beralih ke Apple Silicon (M1), namun periode ini sangat penting dalam membangun ekosistem Mac yang kuat.',
        specs: {
            'Processor': 'Intel Core Duo @ 1.83 - 2.0 GHz',
            'RAM': '512 MB - 2 GB DDR2',
            'Storage': '60 - 120 GB HDD',
            'Display': '13.3" glossy TFT (1280×800)',
            'Graphics': 'Intel GMA 950',
            'Berat': '2.36 kg',
            'Baterai': 'Hingga 6 jam',
            'Harga': '$1,099 USD (2006)'
        },
        modelPath: '/models/macbook.glb',
        timelinePosition: 82.5,
        hasModel: true
    }
};

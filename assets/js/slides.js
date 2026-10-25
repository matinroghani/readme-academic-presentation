(() => {
  "use strict";

  const sources = [
    {
      id: "github-readme",
      group: "official",
      label: "GitHub Docs — About README files",
      shortLabel: "GitHub: README",
      url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes",
      description: "کاربرد README و اطلاعاتی که معمولاً در آن قرار می‌گیرد."
    },
    {
      id: "github-markdown",
      group: "official",
      label: "GitHub Docs — Basic writing and formatting syntax",
      shortLabel: "GitHub: Markdown",
      url: "https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax",
      description: "قواعد پایه قالب‌بندی Markdown در GitHub."
    },
    {
      id: "github-code",
      group: "official",
      label: "GitHub Docs — Creating and highlighting code blocks",
      shortLabel: "GitHub: Code blocks",
      url: "https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks",
      description: "ساخت بلوک‌های کد و مشخص کردن زبان برنامه‌نویسی."
    },
    {
      id: "google-readme",
      group: "guide",
      label: "Google Style Guides — READMEs",
      shortLabel: "Google: READMEs",
      url: "https://google.github.io/styleguide/docguide/READMEs.html",
      description: "توصیه‌های عملی برای ساختار و خوانایی README."
    },
    {
      id: "google-docs",
      group: "guide",
      label: "Google Style Guides — Documentation Best Practices",
      shortLabel: "Google: Documentation",
      url: "https://google.github.io/styleguide/docguide/best_practices.html",
      description: "اصول نگارش و نگهداری مستندات فنی."
    },
    {
      id: "ieee-paper",
      group: "research",
      label: "Lethbridge, T. C., Singer, J., & Forward, A. (2003). How Software Engineers Use Documentation: The State of the Practice. IEEE Software, 20(6), 35–39.",
      shortLabel: "پژوهش IEEE، ۲۰۰۳",
      url: "https://doi.org/10.1109/MS.2003.1241364",
      description: "پژوهشی درباره شیوه استفاده و به‌روزرسانی مستندات توسط مهندسان نرم‌افزار."
    },
    {
      id: "commonmark",
      group: "standard",
      label: "CommonMark — Specification",
      shortLabel: "CommonMark",
      url: "https://commonmark.org/",
      description: "مشخصاتی برای تعریف رفتار قابل‌پیش‌بینی Markdown."
    },
    {
      id: "markdown-guide",
      group: "guide",
      label: "The Markdown Guide — Basic Syntax",
      shortLabel: "Markdown Guide",
      url: "https://www.markdownguide.org/basic-syntax/",
      description: "آموزش قواعد پایه Markdown با مثال."
    },
    {
      id: "aghigh-syllabus",
      group: "academic",
      label: "مؤسسه آموزش عالی عقیق — نمونه سرفصل درس روش تحقیق و گزارش‌نویسی",
      shortLabel: "نمونه سرفصل دانشگاهی",
      url: "https://aghigh.ac.ir/files/%D8%B9%D9%85%D8%B1%D8%A7%D9%86%201401-7-19.pdf",
      description: "نمونه‌ای برای آشنایی با محورهای آموزشی درس؛ نه منبع تخصصی مستندسازی نرم‌افزار."
    },
    {
      id: "github-security",
      group: "security",
      label: "GitHub Docs — About secret scanning",
      shortLabel: "GitHub: امنیت اسرار",
      url: "https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning",
      description: "آشنایی با شناسایی اسرار منتشرشده در مخازن."
    },
    {
      id: "defra-readme",
      group: "guide",
      label: "Defra Software Development Standards — README Standards",
      shortLabel: "استاندارد README در Defra",
      url: "https://defra.github.io/software-development-standards/standards/readme_standards/",
      description: "نمونه‌ای از معیارهای سازمانی برای README."
    }
  ];

  const examples = [
    {
      id: "intro",
      title: "اولین README",
      code: ["# My Project", "", "This is my first README.", "", "**Hello, GitHub!**"].join("\n"),
      preview: "intro"
    },
    {
      id: "headings",
      title: "عنوان و متن",
      code: ["# Simple Calculator", "", "A simple calculator written in Python.", "", "## Features", "", "- Addition", "- Subtraction", "", "**Easy to run.**"].join("\n"),
      preview: "headings"
    },
    {
      id: "lists",
      title: "فهرست، پیوند، تصویر و جدول",
      code: ["## Features", "- Addition", "- Subtraction", "", "[GitHub Docs](https://docs.github.com)", "", "![App screenshot](./images/screenshot.png)", "", "| Feature | Status |", "| --- | --- |", "| Addition | Ready |", "| Division | Planned |"].join("\n"),
      preview: "lists"
    },
    {
      id: "code",
      title: "دستورهای قابل اجرا",
      code: ["## Installation", "", "Clone the project:", "", "```bash", "git clone https://github.com/USERNAME/simple-calculator.git", "cd simple-calculator", "```", "", "## Run", "", "```bash", "python main.py", "```"].join("\n"),
      preview: "code"
    }
  ];

  const sampleREADME = [
    "# Simple Calculator",
    "",
    "A simple calculator written in Python.",
    "",
    "## Features",
    "",
    "- Addition",
    "- Subtraction",
    "- Multiplication",
    "- Division",
    "",
    "## Requirements",
    "",
    "- Python 3",
    "",
    "## Installation",
    "",
    "Clone the repository:",
    "",
    "```bash",
    "git clone https://github.com/USERNAME/simple-calculator.git",
    "cd simple-calculator",
    "```",
    "",
    "## Usage",
    "",
    "Run the program:",
    "",
    "```bash",
    "python main.py",
    "```",
    "",
    "## License",
    "",
    "This project is licensed under the MIT License."
  ].join("\n");

  const slides = [
    {
      kind: "sources-opening",
      title: "منابع و مراجع تحقیق",
      shortTitle: "منابع تحقیق",
      section: "منابع و معرفی",
      duration: 30,
      sources: ["github-readme", "github-markdown", "google-readme", "google-docs", "ieee-paper", "aghigh-syllabus"],
      notes: "این اسلاید نقش نقشه منابع را دارد؛ لازم نیست همه منابع را در ابتدای ارائه توضیح دهیم. مستندات GitHub برای شناخت رفتار README و Markdown در خود GitHub استفاده می‌شوند. راهنماهای Google و Defra نمونه‌هایی از توصیه‌های فنی درباره نگارش مستندات‌اند. مقاله IEEE یک منبع پژوهشی درباره نحوه استفاده و به‌روزرسانی مستندات در محیط مهندسی نرم‌افزار است. سرفصل دانشگاهی صرفاً برای ارتباط با چارچوب درس روش تحقیق و گزارش‌نویسی ذکر شده و منبع فنی این موضوع نیست."
    },
    {
      kind: "cover",
      title: "مستندسازی نرم‌افزار",
      shortTitle: "عنوان تحقیق",
      section: "منابع و معرفی",
      duration: 45,
      sources: [],
      notes: "موضوع تحقیق مستندسازی نرم‌افزار با تمرکز بر فایل README است. در پروژه نرم‌افزاری، فقط نوشتن کد اهمیت ندارد؛ افراد دیگر نیز باید بتوانند هدف پروژه را بفهمند، آن را راه‌اندازی کنند و از آن استفاده کنند. ابتدا مفهوم مستندسازی و README را بررسی می‌کنیم، سپس Markdown را از پایه یاد می‌گیریم و در پایان یک README نمونه را با معیارهای مشخص ارزیابی می‌کنیم. در نسخه نهایی، نام ارائه‌دهنده، استاد، دانشگاه و نیم‌سال را جایگزین جای‌خالی‌ها کنید."
    },
    {
      kind: "problem",
      title: "چرا یک پروژه نرم‌افزاری به README نیاز دارد؟",
      shortTitle: "بیان مسئله",
      section: "مبانی مستندسازی",
      duration: 80,
      sources: ["github-readme", "ieee-paper"],
      notes: "فرض کنید وارد مخزن یک پروژه در GitHub شده‌اید. کدها وجود دارند، اما توضیحی درباره هدف پروژه یا نحوه اجرای آن نیست. در این حالت باید فایل‌ها را بررسی کنید یا از سازنده سؤال بپرسید. README برای کاهش این اصطکاک به کار می‌رود؛ اما صرف وجود این فایل کافی نیست. محتوا باید درست، قابل فهم و متناسب با نیاز مخاطب باشد. GitHub می‌گوید README معمولاً یکی از نخستین چیزهایی است که بازدیدکننده مخزن می‌بیند و می‌تواند توضیح دهد پروژه چیست، چه فایده‌ای دارد و چگونه باید از آن استفاده کرد. مقاله Lethbridge، Singer و Forward نیز نشان می‌دهد که مستندات در عمل استفاده می‌شوند، هرچند گاهی به‌موقع یا کامل به‌روزرسانی نمی‌شوند؛ همچنین مستندات قدیمی در بعضی شرایط هنوز می‌توانند مفید باشند. این نکته، اهمیت نگهداری را نفی نمی‌کند. پرسش محوری ما این است: چه ویژگی‌هایی README را برای فهم، نصب، اجرا و مشارکت در پروژه مفید و قابل اعتماد می‌کند؟"
    },
    {
      kind: "objectives-method",
      title: "اهداف، پرسش‌های تحقیق و روش بررسی",
      shortTitle: "طرح تحقیق",
      section: "مبانی مستندسازی",
      duration: 75,
      sources: ["github-readme", "google-readme", "ieee-paper"],
      notes: "برای منظم بودن تحقیق، هدف، پرسش و روش را از هم جدا می‌کنیم. هدف مشخص می‌کند در پایان چه شناختی می‌خواهیم به دست آوریم؛ پرسش تحقیق مسئله‌ای را مشخص می‌کند که باید به آن پاسخ بدهیم؛ روش تحقیق توضیح می‌دهد چگونه اطلاعات را برای پاسخ جمع‌آوری و بررسی می‌کنیم. روش این کار، مرور منابع معتبر فنی و پژوهشی، استخراج معیارها و تحلیل تطبیقی READMEهاست. اگر چند README واقعی را با معیارهای از پیش تعیین‌شده بررسی کنیم، می‌توانیم آن را مطالعه موردی بنامیم. این کار به خودی خود آزمایش یا پیمایش آماری نیست. هنگام گزارش نتیجه باید بین توصیه منابع و یافته‌های حاصل از بررسی نمونه‌ها تمایز بگذاریم."
    },
    {
      kind: "documentation-types",
      title: "مستندسازی نرم‌افزار چیست؟",
      shortTitle: "مفهوم مستندسازی",
      section: "مبانی مستندسازی",
      duration: 55,
      sources: ["google-docs", "ieee-paper"],
      notes: "مستندسازی نرم‌افزار یعنی تهیه و نگهداری اطلاعاتی که به افراد کمک می‌کند نرم‌افزار را بشناسند، از آن استفاده کنند، توسعه دهند یا نگهداری کنند. مستندات کاربر بر استفاده از قابلیت‌ها و حل مشکلات معمول تمرکز دارد. مستندات فنی درباره معماری، ساختار و رابط‌های سیستم توضیح می‌دهند. مستندات توسعه‌دهنده اطلاعاتی مانند نصب محیط برنامه‌نویسی، تست، مشارکت و نگهداری را پوشش می‌دهند. این گروه‌ها مطلقاً از هم جدا نیستند؛ یک سند، از جمله README، ممکن است بخش‌هایی از چند گروه را پوشش دهد. این اسناد با کد منبع و کامنت‌های داخل کد یکسان نیستند؛ هرکدام مخاطب و کاربرد خود را دارند."
    },
    {
      kind: "readme-definition",
      title: "README چیست و چه کاربردی دارد؟",
      shortTitle: "آشنایی با README",
      section: "مبانی مستندسازی",
      duration: 65,
      sources: ["github-readme", "google-readme", "github-markdown"],
      notes: "README از عبارت Read Me، یعنی «مرا بخوان»، می‌آید. این فایل متنی اطلاعات اولیه و ضروری پروژه را به خواننده می‌دهد: پروژه چه کاری انجام می‌دهد، چرا مفید است، چگونه شروع کنیم و از کجا کمک بگیریم. در GitHub، README مناسب معمولاً در صفحه مخزن نمایش داده می‌شود. README را می‌توان نقطه شروع شناخت پروژه دانست، نه لزوماً جایگزین مستندات جامع. تفاوت با مستندات کامل مطلق نیست؛ README ممکن است مفصل باشد و به جزئیات تخصصی‌تر پیوند بدهد. مثال ماشین‌حساب ساده است، اما در README واقعی باید فقط دستورهای متناسب با ساختار واقعی همان پروژه را بنویسیم. از این نقطه به بعد، مثال اصلی را بر مبنای ماشین‌حساب Python یکپارچه نگه می‌داریم."
    },
    {
      kind: "qualities",
      title: "یک README خوب چه ویژگی‌هایی دارد؟",
      shortTitle: "معیارهای کیفیت",
      section: "مبانی مستندسازی",
      duration: 60,
      sources: ["google-readme", "google-docs", "github-readme"],
      notes: "یک README خوب الزاماً طولانی یا پر از تصویر نیست. مهم این است که اطلاعات لازم را درست و به‌موقع به مخاطب بدهد. وضوح به خواننده کمک می‌کند هدف پروژه را سریع بفهمد. کامل بودن متناسب با پروژه یعنی پیش‌نیازها، نصب، اجرا و نمونه استفاده را در صورت نیاز پوشش دهیم. دقت یعنی دستورها با پروژه واقعی سازگار باشند. ساختار منظم، یافتن اطلاعات را آسان می‌کند. به‌روز بودن نیز مانع از آن می‌شود که کاربر به دستور یا توضیح قدیمی تکیه کند. این ویژگی‌ها باید به معیارهای قابل مشاهده تبدیل شوند؛ مثلاً وجود دستور نصب، قابل‌فهم بودن معرفی یا سازگاری مثال با فایل‌های مخزن."
    },
    {
      kind: "readme-structure",
      title: "ساختار پیشنهادی یک README",
      shortTitle: "بخش‌های README",
      section: "مبانی مستندسازی",
      duration: 55,
      sources: ["google-readme", "defra-readme", "github-readme"],
      notes: "یک ساختار پایه با نام و معرفی پروژه شروع می‌شود، بعد قابلیت‌های اصلی را نشان می‌دهد و سپس پیش‌نیازها، نصب و روش استفاده را توضیح می‌دهد. اطلاعات دیگری مانند تصاویر، تست‌ها، مشارکت، مجوز و راه ارتباطی در صورت نیاز اضافه می‌شوند. این قالب برای همه پروژه‌ها اجباری نیست. کتابخانه نرم‌افزاری ممکن است به نمونه استفاده از API نیاز داشته باشد؛ ابزار خط فرمان باید گزینه‌ها و دستورها را توضیح دهد؛ پروژه دانشگاهی بهتر است هدف و روش اجرا را روشن کند. بخش مجوز را نیز نباید صرفاً برای کامل به نظر رسیدن فایل وارد کنیم: فقط در صورتی نام مجوز را بیاوریم که واقعاً انتخاب و اعمال شده باشد."
    },
    {
      kind: "markdown-intro",
      title: "Markdown چیست و چگونه کار می‌کند؟",
      shortTitle: "شروع Markdown",
      section: "آموزش Markdown",
      duration: 60,
      sources: ["github-markdown", "commonmark", "markdown-guide"],
      notes: "تا اینجا درباره محتوای README صحبت کردیم؛ حالا باید یاد بگیریم چگونه محتوا را مرتب و خوانا کنیم. Markdown یک زبان نشانه‌گذاری سبک است. به کمک چند نشانه متنی ساده می‌توان عنوان، پاراگراف، فهرست، پیوند و بلوک کد ایجاد کرد. فایل‌ها معمولاً پسوند md دارند؛ مانند README.md. کد خام Markdown به خودی خود همان خروجی نیست. محیطی مانند GitHub آن را پردازش می‌کند و نمایش قالب‌بندی‌شده تحویل می‌دهد. در نمایشگرها و پیاده‌سازی‌های مختلف ممکن است جزئیات خروجی اندکی فرق داشته باشد؛ GitHub هم افزونه‌ها و رفتارهای اختصاصی خود را دارد. مثال را بخوانید: # عنوان و دو جفت ** باعث ساخته‌شدن تیتر و متن پررنگ می‌شوند."
    },
    {
      kind: "markdown-text",
      title: "عنوان‌ها، پاراگراف‌ها و قالب‌بندی متن",
      shortTitle: "متن و عنوان‌ها",
      section: "آموزش Markdown",
      duration: 55,
      sources: ["github-markdown", "markdown-guide"],
      notes: "علامت # برای ساخت عنوان به کار می‌رود و هرچه تعداد علامت‌ها بیشتر شود، سطح عنوان پایین‌تر می‌آید. بعد از علامت باید فاصله قرار گیرد. از سطح عنوان‌ها برای نشان دادن ساختار واقعی سند استفاده کنید، نه فقط برای تغییر اندازه ظاهری. برای پاراگراف جدید، بین متن‌ها خط خالی بگذارید. دو ستاره در دو سوی متن آن را پررنگ می‌کنند و یک ستاره معمولاً متن را مورب می‌کند؛ دو علامت موج‌دار می‌تواند متن را خط‌خورده نشان دهد. نتیجه نهایی به پشتیبانی محیط از نشانه‌ها نیز وابسته است."
    },
    {
      kind: "markdown-elements",
      title: "فهرست‌ها، پیوندها، تصاویر و جدول‌ها",
      shortTitle: "اجزای پرکاربرد Markdown",
      section: "آموزش Markdown",
      duration: 60,
      sources: ["github-markdown", "markdown-guide"],
      notes: "فهرست نامرتب برای قابلیت‌ها یا آیتم‌هایی که ترتیب خاصی ندارند مناسب است. فهرست شماره‌دار برای مراحل نصب مفید است. متن پیوند داخل کروشه و مقصد آن داخل پرانتز قرار می‌گیرد. در تصویر نیز قبل از مقصد، علامت ! افزوده می‌شود و متن جایگزین کمک می‌کند تصویر برای دسترس‌پذیری بهتر توصیف شود. مسیر نسبی تصویر باید به فایل واقعی در مخزن اشاره کند؛ اگر فایل وجود نداشته باشد، تصویر نمایش داده نمی‌شود. جدول‌ها برای مقایسه‌های ساده مفیدند، اما جدول پیچیده خوانایی و تجربه موبایل را کاهش می‌دهد. در نمایشگر سمت راست، نتیجه مورد انتظار را نشان می‌دهیم؛ این پیش‌نمایش آموزشی است، نه یک موتور کامل Markdown."
    },
    {
      kind: "markdown-code",
      title: "نمایش کد و دستورهای ترمینال",
      shortTitle: "کد و دستورها",
      section: "آموزش Markdown",
      duration: 75,
      sources: ["github-code", "markdown-guide"],
      notes: "وقتی بخواهیم نام فایل یا یک دستور کوتاه را در یک جمله مشخص کنیم، از بک‌تیک تکی استفاده می‌کنیم. برای چند خط کد از سه بک‌تیک در ابتدا و انتهای بلوک استفاده می‌شود. می‌توانیم نام زبان را پس از سه بک‌تیک اول بنویسیم تا قابلیت برجسته‌سازی نحوی فعال شود؛ مثل javascript یا bash. این برچسب اجرای کد را فعال نمی‌کند، فقط به نمایشگر کمک می‌کند زبان را تشخیص دهد. دستورهای نصب و اجرا باید درست و قابل کپی باشند. دستورات npm برای پروژه‌های Node.js هستند و برای همه پروژه‌ها مناسب نیستند؛ نمونه Python این ارائه نیز باید مطابق فایل‌های واقعی پروژه تنظیم شود."
    },
    {
      kind: "build-readme",
      title: "از صفر یک README واقعی بسازیم",
      shortTitle: "ساخت README نمونه",
      section: "کاربرد و ارزیابی",
      duration: 95,
      sources: ["google-readme", "github-readme", "github-markdown"],
      notes: "اکنون نشانه‌های Markdown را در یک فایل واحد کنار هم می‌گذاریم. عنوان، معرفی و قابلیت‌ها به خواننده می‌گویند پروژه چیست و چه کاری انجام می‌دهد. Requirements پیش‌نیاز را مشخص می‌کند؛ Installation دستورهای دریافت و نصب را ارائه می‌دهد؛ Usage نحوه اجرا را توضیح می‌دهد. آدرس مخزن شامل USERNAME صرفاً جای‌نگهدار است و باید با آدرس واقعی عوض شود. دستور python main.py فقط وقتی صحیح است که فایل main.py واقعاً وجود داشته باشد و برنامه با همین روش اجرا شود. بخش MIT نیز فقط زمانی معتبر است که پروژه واقعاً تحت مجوز MIT منتشر شده باشد. بهترین آزمون README این است که فردی دیگر بتواند دستورها را بدون حدس زدن دنبال کند. دکمه کپی نمونه برای استفاده آموزشی تعبیه شده است."
    },
    {
      kind: "pitfalls-security",
      title: "اشتباهات رایج و ملاحظات امنیتی",
      shortTitle: "خطاها و امنیت",
      section: "کاربرد و ارزیابی",
      duration: 65,
      sources: ["google-docs", "github-security"],
      notes: "توضیح تبلیغاتی و مبهم به مخاطب اطلاعات عملی نمی‌دهد. دستورهای ناقص یا قدیمی نیز باعث اتلاف وقت می‌شوند. README بیش از حد طولانی و بی‌ساختار یافتن اطلاعات مهم را دشوار می‌کند. مهم‌تر از همه، هرگز کلید API، توکن دسترسی، رمز عبور یا داده خصوصی را داخل README یا مخزن عمومی قرار ندهید. اگر راز یا توکنی اشتباهاً منتشر شد، حذف متن به تنهایی کافی نیست؛ احتمال دارد راز در تاریخچه Git، نسخه‌های دیگر یا لاگ‌ها باقی مانده باشد. باید اعتبارنامه را باطل یا تعویض کرد و با توجه به شرایط، تاریخچه مخزن و محل‌های دیگر را اصلاح کرد. این نکته نشان می‌دهد نگهداری مستندات و مخزن بخشی از کیفیت و امنیت نرم‌افزار است."
    },
    {
      kind: "case-study",
      title: "مطالعه موردی: چگونه یک README را ارزیابی کنیم؟",
      shortTitle: "روش ارزیابی",
      section: "کاربرد و ارزیابی",
      duration: 75,
      sources: ["google-readme", "github-readme", "defra-readme"],
      notes: "برای ارزیابی علمی‌تر، نباید صرفاً بگوییم یک README خوب یا بد است. ابتدا دو مخزن عمومی تا حد امکان قابل مقایسه انتخاب می‌کنیم، مثلاً دو پروژه آموزشی کوچک یا دو کتابخانه هم‌نوع. سپس معیارهایی مانند معرفی، نصب و اجرا، پیش‌نیازها، نمونه استفاده، ساختار و نگهداری را یکسان به کار می‌بریم. برای هر معیار شواهد مشخص ثبت می‌کنیم؛ مانند وجود دستور نصب یا ارجاع به نسخه ابزارها. بعد شباهت‌ها و تفاوت‌ها را تحلیل می‌کنیم. این اسلاید روش انجام مطالعه موردی را نشان می‌دهد و ادعایی درباره بررسی مخزن مشخصی ندارد. اگر در ارائه نهایی نتایج واقعی دو مخزن را اضافه کنید، باید نام و پیوند مخزن‌ها و شواهد مشاهده‌شده را نیز ثبت کنید."
    },
    {
      kind: "checklist",
      title: "چک‌لیست نهایی README",
      shortTitle: "چک‌لیست کیفیت",
      section: "کاربرد و ارزیابی",
      duration: 55,
      sources: ["google-readme", "google-docs"],
      notes: "این چک‌لیست ابزار کنترل اولیه است، نه استاندارد رسمی با نمره قبولی قطعی. مواردی مثل روشن بودن هدف، معرفی قابلیت‌ها، مشخص بودن پیش‌نیازها، دقیق بودن مراحل نصب، سازگاری دستورها، نظم عنوان‌ها، نمایش صحیح کد، کارکرد پیوند و تصویر، نبود اطلاعات حساس، صحت مجوز و هماهنگی با نسخه فعلی پروژه را بررسی می‌کنیم. تیک زدن همه موارد به تنهایی کیفیت را تضمین نمی‌کند؛ باید ببینیم هر مطلب در عمل درست و متناسب با مخاطب است یا نه. چک‌لیست تعاملی این اسلاید را می‌توان هنگام ارائه علامت زد و در پایان بازنشانی کرد."
    },
    {
      kind: "findings",
      title: "تحلیل یافته‌ها: چه چیزی README را مفید می‌کند؟",
      shortTitle: "تحلیل و پاسخ تحقیق",
      section: "جمع‌بندی",
      duration: 60,
      sources: ["google-readme", "github-readme", "ieee-paper"],
      notes: "جمع‌بندی معیارهای مستندات فنی این است که README مفید باید روشن، ساختارمند، دقیق، قابل اجرا و متناسب با مخاطب باشد. وضوح معرفی به کاربر کمک می‌کند تناسب پروژه را تشخیص دهد؛ دستورهای اجرایی فاصله بین خواندن و استفاده را کاهش می‌دهند؛ عنوان‌ها و فهرست‌ها یافتن اطلاعات را ساده می‌کنند؛ و صحت و به‌روز بودن از هدایت کاربر به راهکار نادرست جلوگیری می‌کنند. این‌ها جمع‌بندی توصیه‌های منابع هستند. اگر فقط چند README بررسی شده باشند، نباید ادعا کنیم این نمونه‌ها به‌تنهایی ثابت می‌کنند این ویژگی‌ها در همه پروژه‌ها رابطه علّی با موفقیت دارند. برای آزمون تجربی چنین ادعایی، به داده‌هایی مانند زمان نصب موفق یا بازخورد کاربران نیاز است."
    },
    {
      kind: "conclusion",
      title: "نتیجه‌گیری و پیشنهادهای تحقیق",
      shortTitle: "نتیجه‌گیری",
      section: "جمع‌بندی",
      duration: 55,
      sources: ["google-readme", "github-readme", "ieee-paper"],
      notes: "نتیجه اصلی این است که README را نباید کاری تزئینی یا موکول به پایان پروژه دانست. فایل باید هدف، پیش‌نیازها، روش نصب و شیوه استفاده را روشن کند و همراه با نرم‌افزار به‌روزرسانی شود. پیشنهاد عملی این است که از الگوی پایه شروع کنیم، دستورها را عملاً آزمایش کنیم، هنگام تغییر قابلیت‌ها و وابستگی‌ها فایل را بازبینی کنیم و در پروژه‌های تیمی مسئولیت بازبینی مستندات را مشخص کنیم. این تحقیق چارچوبی عملی برای نوشتن و ارزیابی README ارائه می‌دهد؛ برای سنجش تجربی تأثیر آن بر موفقیت پروژه باید مطالعه گسترده‌تر و داده‌های واقعی جمع‌آوری شود."
    },
    {
      kind: "sources-closing",
      title: "منابع و مراجع تحقیق",
      shortTitle: "کتاب‌نامه",
      section: "جمع‌بندی",
      duration: 40,
      sources: ["github-readme", "github-markdown", "google-readme", "google-docs", "commonmark", "markdown-guide", "ieee-paper", "aghigh-syllabus"],
      notes: "منابع رسمی و راهنماهای فنی برای قواعد Markdown و شیوه نوشتن README استفاده شده‌اند؛ مقاله IEEE منبع پژوهشی برای فهم نحوه استفاده و نگهداری مستندات در عمل است. این دو نوع منبع کارکرد یکسان ندارند. هنگام تحویل نهایی می‌توانید تاریخ دسترسی به صفحات آنلاین را طبق شیوه ارجاع مورد انتظار استاد اضافه کنید. ترتیب نویسندگان مقاله بر اساس رکوردهای کتاب‌شناختی این‌گونه است: Timothy C. Lethbridge، Janice Singer و Andrew Forward. سرفصل دانشگاهی به عنوان نمونه برای ارتباط با درس آمده، نه شاهدی درباره کیفیت README."
    },
    {
      kind: "qa",
      title: "پرسش و گفت‌وگو",
      shortTitle: "پرسش و پاسخ",
      section: "جمع‌بندی",
      duration: 40,
      sources: [],
      notes: "برای پایان، سه سؤال کوتاه از مخاطبان بپرسید: اگر README فقط نام پروژه را داشته باشد، چه اطلاعاتی کم است؟ آیا ظاهر زیبا مهم‌تر است یا دقت و قابلیت اجرا، و آیا می‌توان هر دو را داشت؟ اگر کد تغییر کند اما README به‌روز نشود، چه مشکلی رخ می‌دهد؟ سپس از دانشجویان بخواهید برای یک پروژه ساده، یک README سه‌بخشی بنویسند: عنوان و معرفی، دو قابلیت و یک دستور اجرا در صورت مشخص بودن زبان و محیط. پیام نهایی این است که با یادگیری چند نشانه Markdown می‌توان مستندی خوانا ساخت، اما کیفیت مستندات به اطلاعات درست و نگهداری آن‌ها بستگی دارد."
    }
  ];

  const expectedTotalSeconds = 1200;
  const calculatedTotalSeconds = slides.reduce((total, slide) => total + slide.duration, 0);

  if (slides.length !== 20) {
    throw new Error(`Expected 20 slides, received ${slides.length}.`);
  }
  if (calculatedTotalSeconds !== expectedTotalSeconds) {
    throw new Error(`Expected 1200 seconds, received ${calculatedTotalSeconds}.`);
  }

  window.README_PRESENTATION = {
    slides,
    sources,
    examples,
    sampleREADME,
    totalSeconds: expectedTotalSeconds
  };
})();

(() => {
  "use strict";

  const { slides, sources, examples, sampleREADME, totalSeconds } = window.README_PRESENTATION;
  const $ = (id) => document.getElementById(id);
  const state = {
    index: 0,
    started: false,
    totalRemaining: totalSeconds,
    slideRemaining: slides[0].duration,
    checklist: Array(11).fill(false),
    toastTimeout: null
  };

  const slideRoot = $("slideRoot");
  const notesPanel = $("notesPanel");
  const notesToggle = $("notesToggle");
  const notesContent = $("notesContent");
  const notesSources = $("notesSources");
  const playPauseBtn = $("playPauseBtn");
  const playPauseText = $("playPauseText");
  const playPauseIcon = $("playPauseIcon");
  const toast = $("toast");

  const sourceById = Object.fromEntries(sources.map((source) => [source.id, source]));

  function fa(value) {
    return String(value).replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatTime(seconds) {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(safeSeconds / 60);
    const remainder = safeSeconds % 60;
    return `${fa(String(minutes).padStart(2, "0"))}:${fa(String(remainder).padStart(2, "0"))}`;
  }

  function formatDuration(seconds) {
    if (seconds < 60) return `${fa(seconds)} ثانیه`;
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return remainder ? `${fa(minutes)} دقیقه و ${fa(remainder)} ثانیه` : `${fa(minutes)} دقیقه`;
  }

  function sourceLink(sourceId, compact = false) {
    const source = sourceById[sourceId];
    if (!source) return "";
    const label = compact ? source.shortLabel : source.label;
    return `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer noopener">${escapeHtml(label)}<span aria-hidden="true"> ↗</span></a>`;
  }

  function codeBlock(code, language = "text", id = "code-block") {
    return `
      <div class="code-panel" dir="ltr">
        <div class="code-panel-head">
          <span class="code-language">${escapeHtml(language)}</span>
          <button type="button" class="copy-button" data-copy-target="${escapeHtml(id)}">کپی کد</button>
        </div>
        <pre><code id="${escapeHtml(id)}">${escapeHtml(code)}</code></pre>
      </div>`;
  }

  function sourceStrip(slide) {
    if (!slide.sources?.length || ["sources-opening", "sources-closing", "cover", "qa"].includes(slide.kind)) return "";
    const visible = slide.sources.slice(0, 3);
    const extra = slide.sources.length - visible.length;
    return `<div class="slide-source-strip"><span>منبع:</span>${visible.map((id) => sourceLink(id, true)).join("")}${extra > 0 ? `<span class="source-more">و ${fa(extra)} منبع دیگر در یادداشت‌ها</span>` : ""}</div>`;
  }

  function renderOpeningSources() {
    const groups = [
      {
        heading: "منابع رسمی و فنی",
        ids: ["github-readme", "github-markdown", "google-readme", "google-docs"]
      },
      {
        heading: "منبع پژوهشی",
        ids: ["ieee-paper"]
      },
      {
        heading: "مرجع مرتبط با روش تحقیق",
        ids: ["aghigh-syllabus"]
      }
    ];
    return `
      <div class="source-intro">Software Documentation &amp; README Best Practices</div>
      <div class="reference-groups">${groups.map((group) => `
        <section class="reference-group">
          <h2>${escapeHtml(group.heading)}</h2>
          <ol>${group.ids.map((id) => `<li>${sourceLink(id)}${id === "aghigh-syllabus" ? `<p>برای آشنایی با محورهای آموزشی درس؛ نه به‌عنوان منبع فنی README.</p>` : ""}</li>`).join("")}</ol>
        </section>`).join("")}</div>`;
  }

  function renderCover() {
    return `
      <div class="cover-composition">
        <div class="cover-kicker">تحقیق درس روش تحقیق و گزارش‌نویسی</div>
        <div class="cover-rule"></div>
        <h2>مستندسازی نرم‌افزار</h2>
        <p class="cover-subtitle">چگونه یک فایل README استاندارد برای پروژه‌های GitHub بنویسیم؟</p>
        <p class="cover-english" dir="ltr">Software Documentation: How to Write a Standard README for GitHub Projects</p>
        <div class="cover-meta">
          <div><span>ارائه‌دهنده</span><strong>متین روغنی</strong></div>
          <div><span>نام استاد</span><strong>دکتر زهرا کریمی</strong></div>
          <div><span>نام دانشگاه</span><strong>دانشگاه شهرکرد</strong></div>
          <div><span>نیم‌سال تحصیلی</span><strong>1405-1</strong></div>
        </div>
      </div>`;
  }

  function renderProblem() {
    return `
      <div class="problem-layout">
        <section class="problem-statement">
          <span class="label-line">مسئله اصلی</span>
          <p class="large-copy">ممکن است یک پروژه از نظر کدنویسی درست کار کند، اما فرد تازه‌وارد نداند <strong>پروژه چه می‌کند، چگونه اجرا می‌شود یا از کجا باید شروع کند.</strong></p>
          <div class="question-callout"><span>پرسش اصلی تحقیق</span><p>چه ویژگی‌هایی README را برای فهم، نصب، اجرا و مشارکت در پروژه مفید و قابل اعتماد می‌کند؟</p></div>
        </section>
        <section class="problem-consequences">
          <h2>پیامدهای احتمالی README ضعیف</h2>
          <ul class="check-list compact">
            <li>دشوار شدن درک هدف و قابلیت‌های پروژه</li>
            <li>اتلاف وقت هنگام نصب و راه‌اندازی</li>
            <li>نیاز بیشتر به پرسیدن سؤال از توسعه‌دهنده</li>
            <li>سخت‌تر شدن مشارکت افراد جدید</li>
            <li>سردرگمی به‌خاطر راهنمای قدیمی</li>
          </ul>
          <p class="evidence-note">GitHub، README را یکی از نخستین نقاط تماس بازدیدکننده با مخزن معرفی می‌کند.</p>
        </section>
      </div>`;
  }

  function renderObjectives() {
    return `
      <div class="two-column-layout">
        <section class="content-panel">
          <h2>هدف تحقیق</h2>
          <p>شناسایی ویژگی‌ها و اجزای یک README باکیفیت و آموزش طراحی آن با Markdown.</p>
          <h3>اهداف فرعی</h3>
          <ul class="bullet-list">
            <li>شناخت نقش مستندسازی و README</li><li>یادگیری قواعد پایه Markdown</li><li>شناسایی خطاهای رایج</li><li>طراحی چک‌لیست ارزیابی</li>
          </ul>
        </section>
        <section class="content-panel">
          <h2>پرسش و روش</h2>
          <p><strong>پرسش:</strong> چه ویژگی‌هایی README را برای معرفی، نصب و استفاده از پروژه مفید می‌کنند؟</p>
          <h3>روش بررسی</h3>
          <div class="method-steps"><div><b>۱</b><span>مرور منابع فنی و پژوهشی</span></div><div><b>۲</b><span>استخراج معیارهای کیفیت</span></div><div><b>۳</b><span>تحلیل تطبیقی READMEها</span></div></div>
          <p class="small-note">این روش، به‌خودی‌خود آزمایش یا پیمایش آماری نیست.</p>
        </section>
      </div>`;
  }

  function renderDocumentationTypes() {
    return `
      <p class="lead-copy">مستندسازی یعنی تهیه و نگهداری اطلاعاتی که به افراد کمک می‌کند نرم‌افزار را بشناسند، استفاده کنند، توسعه دهند یا نگهداری کنند.</p>
      <div class="three-card-grid documentation-cards">
        <article class="content-card"><span class="card-number">۰۱</span><h2>مستندات کاربر</h2><p>راهنمای استفاده از قابلیت‌ها، نصب و حل مشکلات متداول.</p><span class="card-audience">مخاطب: کاربر نهایی</span></article>
        <article class="content-card"><span class="card-number">۰۲</span><h2>مستندات فنی</h2><p>توضیح معماری، ساختار، رابط‌ها و جزئیات فنی سیستم.</p><span class="card-audience">مخاطب: تیم فنی</span></article>
        <article class="content-card"><span class="card-number">۰۳</span><h2>مستندات توسعه‌دهنده</h2><p>اطلاعات نصب محیط، تست، مشارکت و نگهداری پروژه.</p><span class="card-audience">مخاطب: توسعه‌دهنده</span></article>
      </div>
      <div class="note-band"><strong>نکته:</strong> یک سند، از جمله README، می‌تواند بخشی از چند نوع مستندات را پوشش دهد. کامنت‌های کد جایگزین کامل مستندات نیستند.</div>`;
  }

  function renderReadmeDefinition() {
    const code = ["# Simple Calculator", "", "A simple calculator written in Python.", "", "## Features", "", "- Addition", "- Subtraction", "- Multiplication", "- Division", "", "## Usage", "", "Run the program with Python 3:", "", "```bash", "python main.py", "```"].join("\n");
    return `
      <div class="readme-intro-grid">
        <section>
          <span class="definition-label">Read Me — «مرا بخوان»</span>
          <p class="large-copy">README فایلی متنی است که <strong>اطلاعات اولیه و ضروری</strong> درباره یک پروژه را در اختیار خواننده قرار می‌دهد.</p>
          <div class="answer-pills"><span>پروژه چیست؟</span><span>چرا مفید است؟</span><span>چگونه اجرا شود؟</span><span>از کجا کمک بگیریم؟</span></div>
          <div class="small-note">در GitHub، README معمولاً در صفحه مخزن نمایش داده می‌شود.</div>
        </section>
        <section class="readme-mini-example">
          <div class="mini-window-bar"><span></span><span></span><span></span><b>README.md</b></div>
          <div class="readme-mini-content"><h2>Simple Calculator</h2><p>A simple calculator written in Python.</p><h3>Features</h3><ul><li>Addition</li><li>Subtraction</li></ul><h3>Usage</h3><code>python main.py</code></div>
        </section>
      </div>
      <div class="note-band">README نقطه شروع شناخت پروژه است؛ مستندات جامع می‌توانند جزئیات معماری، API یا راهنمای کامل‌تری ارائه کنند.</div>
      <div class="visually-hidden">${escapeHtml(code)}</div>`;
  }

  function renderQualities() {
    return `
      <div class="quality-grid">
        <div class="quality-list">
          <div class="quality-item"><span>۱</span><div><h2>واضح</h2><p>هدف و کاربرد پروژه را سریع توضیح دهد.</p></div></div>
          <div class="quality-item"><span>۲</span><div><h2>کافی</h2><p>اطلاعات ضروری نصب و استفاده را پوشش دهد.</p></div></div>
          <div class="quality-item"><span>۳</span><div><h2>دقیق</h2><p>دستورها با وضعیت واقعی پروژه سازگار باشند.</p></div></div>
          <div class="quality-item"><span>۴</span><div><h2>ساختارمند</h2><p>تیترها و فهرست‌ها مسیر خواندن را روشن کنند.</p></div></div>
          <div class="quality-item"><span>۵</span><div><h2>به‌روز</h2><p>با تغییرات پروژه بازبینی شود.</p></div></div>
        </div>
        <div class="comparison-panel">
          <div class="comparison-heading">مقایسه کوتاه</div>
          <div class="comparison-example weak"><span class="comparison-label">نمونه ضعیف</span><p>«این یک پروژه عالی و کاربردی است!»</p></div>
          <div class="comparison-example strong"><span class="comparison-label">نمونه بهتر</span><p>«ماشین‌حسابی با Python که عملیات جمع، تفریق، ضرب و تقسیم را انجام می‌دهد.»</p></div>
          <p class="small-note">نمونه دوم هدف و قابلیت‌ها را مشخص می‌کند؛ اما برای راه‌اندازی کامل ممکن است به توضیح بیشتری نیاز باشد.</p>
        </div>
      </div>`;
  }

  function renderReadmeStructure() {
    const rows = [
      ["وب‌سایت", "پیش‌نیازها، نصب وابستگی‌ها، تنظیمات و اجرای محلی"],
      ["کتابخانه", "روش نصب، APIهای اصلی و مثال استفاده"],
      ["ابزار خط فرمان", "دستورها، گزینه‌ها و ورودی‌ها"],
      ["پروژه دانشگاهی", "هدف، روش اجرا، ابزارها و نتایج"]
    ];
    return `
      <div class="structure-sequence">
        <div><span>۱</span><h2>معرفی</h2><p>پروژه چیست؟</p></div><i aria-hidden="true">←</i>
        <div><span>۲</span><h2>قابلیت‌ها</h2><p>چه می‌کند؟</p></div><i aria-hidden="true">←</i>
        <div><span>۳</span><h2>پیش‌نیازها</h2><p>چه لازم است؟</p></div><i aria-hidden="true">←</i>
        <div><span>۴</span><h2>نصب و اجرا</h2><p>چطور شروع کنیم؟</p></div><i aria-hidden="true">←</i>
        <div><span>۵</span><h2>اطلاعات تکمیلی</h2><p>مجوز، تست، کمک</p></div>
      </div>
      <div class="table-wrap"><table class="academic-table"><thead><tr><th>نوع پروژه</th><th>اطلاعات مهم در README</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join("")}</tbody></table></div>
      <p class="small-note">این الگو پیشنهادی است، نه قالبی اجباری برای همه پروژه‌ها. بخش مجوز را فقط در صورت انتخاب و اعمال واقعی آن اضافه کنید.</p>`;
  }

  function renderMarkdownIntro() {
    const example = examples.find((item) => item.id === "intro");
    return `
      <p class="lead-copy">Markdown زبان نشانه‌گذاری سبکی است که با چند علامت متنی، ساختار و قالب‌بندی محتوا را مشخص می‌کند.</p>
      <div class="markdown-flow" aria-label="روند تبدیل Markdown به خروجی"><div><b>متن Markdown</b><small>نشانه‌های ساده</small></div><span aria-hidden="true">←</span><div><b>فایل README.md</b><small>ذخیره در مخزن</small></div><span aria-hidden="true">←</span><div><b>نمایش قالب‌بندی‌شده</b><small>برای نمونه در GitHub</small></div></div>
      <div class="code-preview-grid">
        <section><div class="panel-heading"><h2>متن نوشته‌شده</h2><span class="panel-tag">Markdown</span></div>${codeBlock(example.code, "markdown", "md-intro-code")}</section>
        <section class="preview-panel" data-preview="intro"><div class="panel-heading"><h2>خروجی مورد انتظار</h2><span class="panel-tag">Preview</span></div><div class="preview-paper"><h1>My Project</h1><p>This is my first README.</p><p><strong>Hello, GitHub!</strong></p></div><button type="button" class="preview-toggle" data-preview-toggle="intro">پنهان کردن پیش‌نمایش</button></section>
      </div>
      <p class="small-note">فایل‌های Markdown معمولاً پسوند <code dir="ltr">.md</code> دارند. جزئیات نمایش به محیطی که Markdown را پردازش می‌کند بستگی دارد.</p>`;
  }

  function renderMarkdownText() {
    const code = ["# عنوان اصلی پروژه", "", "## بخش اصلی", "", "### زیربخش", "", "این پروژه یک ماشین‌حساب ساده است.", "", "این برنامه عملیات جمع و تفریق را انجام می‌دهد.", "", "**متن مهم**", "", "*متن تأکیدی*", "", "~~متن حذف‌شده~~"].join("\n");
    return `
      <div class="markdown-text-grid">
        <section>${codeBlock(code, "markdown", "md-text-code")}</section>
        <section class="preview-paper typography-preview" data-preview="text">
          <h1>عنوان اصلی پروژه</h1><h2>بخش اصلی</h2><h3>زیربخش</h3>
          <p>این پروژه یک ماشین‌حساب ساده است.</p><p>این برنامه عملیات جمع و تفریق را انجام می‌دهد.</p>
          <p><strong>متن مهم</strong></p><p><em>متن تأکیدی</em></p><p><del>متن حذف‌شده</del></p>
          <button type="button" class="preview-toggle" data-preview-toggle="text">پنهان کردن پیش‌نمایش</button>
        </section>
      </div>
      <div class="syntax-key"><div><code>#</code><span>عنوان و سطح‌بندی</span></div><div><code>**متن**</code><span>پررنگ</span></div><div><code>*متن*</code><span>مورب</span></div><div><code>~~متن~~</code><span>خط‌خورده</span></div></div>
      <p class="small-note">برای پاراگراف جدید، بین دو بخش یک خط خالی قرار دهید. عنوان‌ها را بر اساس ساختار محتوا انتخاب کنید، نه فقط اندازه ظاهری.</p>`;
  }

  function renderMarkdownElements() {
    const example = examples.find((item) => item.id === "lists");
    return `
      <div class="elements-grid">
        <section class="elements-source"><div class="panel-heading"><h2>کد Markdown</h2><span class="panel-tag">Syntax</span></div>${codeBlock(example.code, "markdown", "md-elements-code")}</section>
        <section class="elements-preview" data-preview="lists">
          <div class="panel-heading"><h2>خروجی مورد انتظار</h2><span class="panel-tag">Preview</span></div>
          <div class="preview-paper elements-paper">
            <h2>Features</h2><ul><li>Addition</li><li>Subtraction</li></ul>
            <p><a href="https://docs.github.com" target="_blank" rel="noreferrer noopener">GitHub Docs ↗</a></p>
            <div class="image-placeholder"><span class="placeholder-icon">▧</span><strong>App screenshot</strong><small>./images/screenshot.png</small><em>فایل تصویر باید در این مسیر وجود داشته باشد.</em></div>
            <table class="preview-table"><thead><tr><th>Feature</th><th>Status</th></tr></thead><tbody><tr><td>Addition</td><td>Ready</td></tr><tr><td>Division</td><td>Planned</td></tr></tbody></table>
          </div>
          <button type="button" class="preview-toggle" data-preview-toggle="lists">پنهان کردن پیش‌نمایش</button>
        </section>
      </div>
      <div class="syntax-key compact-key"><div><code>- مورد</code><span>فهرست نامرتب</span></div><div><code>1. مورد</code><span>فهرست شماره‌دار</span></div><div><code>[متن](نشانی)</code><span>پیوند</span></div><div><code>![توضیح](مسیر)</code><span>تصویر</span></div></div>
      <p class="small-note">جدول را برای مقایسه ساده به کار ببرید؛ از جدول‌های بیش از حد پیچیده پرهیز کنید.</p>`;
  }

  function renderMarkdownCode() {
    const inline = "برای اجرای پروژه، دستور `python main.py` را وارد کنید.";
    const code = ["```javascript", "function greet(name) {", "  return `Hello, ${name}!`;", "}", "", "console.log(greet(\"GitHub\"));", "```"].join("\n");
    const commands = ["## Installation", "", "Clone the project:", "", "```bash", "git clone https://github.com/USERNAME/simple-calculator.git", "cd simple-calculator", "```", "", "## Run", "", "```bash", "python main.py", "```"].join("\n");
    return `
      <div class="inline-code-example"><div><span class="label-line">کد درون‌خطی</span><p>${escapeHtml(inline).replace(/`([^`]+)`/g, "<code dir=\"ltr\">$1</code>")}</p></div><div class="inline-code-token"><code>&#96;python main.py&#96;</code></div></div>
      <div class="code-demo-grid">
        <section><div class="panel-heading"><h2>بلوک چندخطی کد</h2><span class="panel-tag">Fenced code</span></div>${codeBlock(code, "javascript", "md-fenced-code")}<p class="small-note">نام زبان پس از سه بک‌تیک اول می‌آید؛ این کار برای نمایش نحوی است، نه اجرای کد.</p></section>
        <section><div class="panel-heading"><h2>نمونه دستور نصب و اجرا</h2><span class="panel-tag">bash</span></div>${codeBlock(commands, "markdown", "md-bash-code")}<p class="small-note">دستورها باید با فایل‌ها و ابزارهای واقعی پروژه سازگار باشند.</p></section>
      </div>`;
  }

  function renderBuildReadme() {
    return `
      <div class="readme-builder-grid">
        <section><div class="panel-heading"><h2>فایل کامل README.md</h2><span class="panel-tag">قابل کپی</span></div>${codeBlock(sampleREADME, "markdown", "sample-readme-code")}<div class="builder-actions"><button type="button" class="control-button primary" data-copy-target="sample-readme-code">کپی کل README</button><button type="button" class="control-button secondary" id="downloadReadmeBtn">دانلود README.md</button></div></section>
        <section class="readme-preview-column"><div class="panel-heading"><h2>نمایش نمونه</h2><span class="panel-tag">Preview</span></div><div class="readme-rendered preview-paper" data-preview="full-readme">
          <h1>Simple Calculator</h1><p>A simple calculator written in Python.</p><h2>Features</h2><ul><li>Addition</li><li>Subtraction</li><li>Multiplication</li><li>Division</li></ul><h2>Requirements</h2><ul><li>Python 3</li></ul><h2>Installation</h2><p>Clone the repository:</p><pre><code>git clone https://github.com/USERNAME/simple-calculator.git<br>cd simple-calculator</code></pre><h2>Usage</h2><p>Run the program:</p><pre><code>python main.py</code></pre><h2>License</h2><p>This project is licensed under the MIT License.</p>
        </div><button type="button" class="preview-toggle" data-preview-toggle="full-readme">پنهان کردن پیش‌نمایش</button></section>
      </div>
      <div class="note-band caution-band"><strong>قبل از استفاده:</strong> نشانی مخزن و دستور اجرا نمونه‌اند. نام MIT فقط وقتی درست است که همین مجوز واقعاً برای پروژه انتخاب شده باشد.</div>`;
  }

  function renderPitfalls() {
    return `
      <div class="pitfall-grid">
        <article class="pitfall-card"><span>۰۱</span><h2>توضیح مبهم</h2><p>«این یک پروژه عالی است.»</p><small>بهتر است هدف و قابلیت را مشخص کنیم.</small></article>
        <article class="pitfall-card"><span>۰۲</span><h2>دستورهای قدیمی</h2><p>مراحل اجرا دیگر با نسخه فعلی سازگار نیستند.</p><small>دستورها را عملاً آزمایش کنید.</small></article>
        <article class="pitfall-card"><span>۰۳</span><h2>ساختار نامنظم</h2><p>اطلاعات تکراری و بدون عنوان مناسب.</p><small>بخش‌بندی را بر اساس نیاز مخاطب انجام دهید.</small></article>
        <article class="pitfall-card security-card"><span>۰۴</span><h2>افشای اطلاعات حساس</h2><p>کلید API، رمز عبور یا توکن دسترسی.</p><small>این اطلاعات را وارد مخزن عمومی نکنید.</small></article>
      </div>
      <div class="security-warning"><strong>اگر راز یا توکن منتشر شد:</strong> فقط حذف متن کافی نیست. اعتبارنامه را باطل یا تعویض کنید و در صورت نیاز تاریخچه Git و نسخه‌های دیگر را نیز بررسی کنید.</div>`;
  }

  function renderCaseStudy() {
    const criteria = [
      ["معرفی پروژه", "آیا هدف پروژه روشن است؟"],
      ["نصب و اجرا", "آیا مراحل دقیق و قابل دنبال‌کردن‌اند؟"],
      ["پیش‌نیازها", "آیا ابزارها و نسخه‌های لازم ذکر شده‌اند؟"],
      ["مثال کاربردی", "آیا نمونه استفاده وجود دارد؟"],
      ["ساختار و خوانایی", "آیا عنوان‌ها و بخش‌ها منظم‌اند؟"],
      ["نگهداری", "آیا محتوا با وضعیت فعلی پروژه سازگار است؟"]
    ];
    return `
      <div class="case-study-heading"><p class="lead-copy">برای قضاوت مستند، معیارها را پیشاپیش مشخص کنید و برای هر مورد شواهد قابل مشاهده ثبت کنید.</p><span class="method-badge">چارچوب ارزیابی</span></div>
      <div class="table-wrap"><table class="academic-table case-table"><thead><tr><th>معیار</th><th>پرسش ارزیابی</th><th>نمونه شاهد</th></tr></thead><tbody>${criteria.map((item, index) => `<tr><td>${item[0]}</td><td>${item[1]}</td><td>${["توضیح یک‌جمله‌ای هدف", "وجود دستور و ترتیب اجرا", "ذکر نسخه Python یا ابزار لازم", "قطعه کد یا دستور نمونه", "تیترها و فهرست‌های مشخص", "سازگاری با فایل‌های مخزن"][index]}</td></tr>`).join("")}</tbody></table></div>
      <div class="method-steps compact-steps"><div><b>۱</b><span>انتخاب دو مخزن هم‌نوع</span></div><div><b>۲</b><span>ثبت شواهد با معیار یکسان</span></div><div><b>۳</b><span>مقایسه و تفسیر تفاوت‌ها</span></div></div>
      <p class="small-note">این اسلاید روش مطالعه موردی را نشان می‌دهد؛ تا پیش از بررسی دو مخزن مشخص، نتیجه واقعی یا رتبه‌بندی اعلام نکنید.</p>`;
  }

  function renderChecklist() {
    const groups = [
      { title: "معرفی پروژه", items: ["عنوان و هدف پروژه روشن است.", "قابلیت‌های اصلی معرفی شده‌اند."] },
      { title: "نصب و اجرا", items: ["پیش‌نیازها مشخص شده‌اند.", "مراحل نصب و اجرا دقیق‌اند.", "دستورها با وضعیت واقعی پروژه سازگارند."] },
      { title: "خوانایی", items: ["عنوان‌ها و فهرست‌ها منظم‌اند.", "کد و دستورها در بلوک مناسب قرار گرفته‌اند.", "پیوندها و تصاویر کار می‌کنند."] },
      { title: "اعتماد و نگهداری", items: ["اطلاعات حساس منتشر نشده‌اند.", "مجوز، در صورت نیاز، درست معرفی شده است.", "README با نسخه فعلی پروژه هماهنگ است."] }
    ];
    let index = 0;
    const body = groups.map((group) => `<fieldset class="checklist-group"><legend>${group.title}</legend>${group.items.map((item) => {
      const current = index++;
      return `<label class="checklist-item"><input type="checkbox" data-checklist-index="${current}" ${state.checklist[current] ? "checked" : ""}><span>${item}</span></label>`;
    }).join("")}</fieldset>`).join("");
    const completed = state.checklist.filter(Boolean).length;
    return `
      <div class="checklist-head"><p class="lead-copy">پیش از انتشار پروژه، موارد زیر را بررسی کنید.</p><div class="checklist-count"><strong id="checklistCount">${fa(completed)} از ۱۱</strong><span>مورد بررسی‌شده</span><div class="checklist-meter"><i id="checklistMeterFill" style="width:${(completed / 11) * 100}%"></i></div></div></div>
      <div class="checklist-grid">${body}</div>
      <div class="checklist-footer"><span>این چک‌لیست برای کنترل اولیه است؛ نه استاندارد رسمی با نمره قبولی قطعی.</span><button type="button" class="control-button subtle" id="resetChecklistBtn">شروع دوباره</button></div>`;
  }

  function renderFindings() {
    return `
      <div class="findings-grid">
        <article><span>یافته ۱</span><h2>وضوح، بهتر از تبلیغ است</h2><p>معرفی دقیق کمک می‌کند کاربر تناسب پروژه با نیاز خود را تشخیص دهد.</p></article>
        <article><span>یافته ۲</span><h2>اجراپذیری، معیار عملی است</h2><p>مراحل نصب و اجرا مسیر استفاده واقعی را روشن می‌کنند.</p></article>
        <article><span>یافته ۳</span><h2>ساختار، یافتن را آسان می‌کند</h2><p>تیترها، فهرست‌ها، مثال‌ها و پیوندها به پیمایش کمک می‌کنند.</p></article>
        <article><span>یافته ۴</span><h2>صحت، اعتماد می‌سازد</h2><p>محتوای قدیمی ممکن است کاربر را به دستور نادرست هدایت کند.</p></article>
      </div>
      <div class="answer-panel"><span>پاسخ فشرده به پرسش تحقیق</span><p>یک README مفید باید <strong>روشن، ساختارمند، دقیق، قابل اجرا و متناسب با مخاطب</strong> باشد. Markdown ابزار ساخت این ساختار است؛ کیفیت نهایی به انتخاب و نگهداری اطلاعات درست وابسته است.</p></div>
      <p class="small-note">این جمع‌بندی معیارهای منابع است؛ ادعای رابطه علّی قطعی به داده‌های تجربی گسترده‌تر نیاز دارد.</p>`;
  }

  function renderConclusion() {
    return `
      <div class="conclusion-grid">
        <section><h2>نتیجه‌گیری</h2><ul class="bullet-list large-bullets"><li>README از نخستین نقاط تماس کاربر با مخزن است.</li><li>هدف، پیش‌نیازها، نصب و استفاده باید روشن باشند.</li><li>Markdown ساختاردهی را ساده می‌کند.</li><li>دقت و به‌روز بودن به اندازه ظاهر اهمیت دارند.</li></ul></section>
        <section><h2>پیشنهادهای کاربردی</h2><ol class="number-list"><li>از یک الگوی پایه شروع کنید و آن را متناسب با پروژه تغییر دهید.</li><li>دستورهای نصب و اجرا را عملاً آزمایش کنید.</li><li>با تغییر پروژه، README را بازبینی کنید.</li><li>در پروژه تیمی، مسئول بازبینی مستندات را مشخص کنید.</li></ol></section>
      </div>
      <div class="limitation-band"><strong>محدودیت:</strong> برای سنجش تجربی اثر README بر موفقیت پروژه، به داده‌هایی مانند زمان نصب، موفقیت اجرای دستورها و بازخورد کاربران نیاز داریم.</div>`;
  }

  function renderClosingSources() {
    const groups = [
      { heading: "الف) مستندات رسمی و راهنماهای فنی", ids: ["github-readme", "github-markdown", "github-code", "google-readme", "google-docs", "commonmark", "markdown-guide"] },
      { heading: "ب) منبع پژوهشی", ids: ["ieee-paper"] },
      { heading: "ج) مرجع مرتبط با درس", ids: ["aghigh-syllabus"] }
    ];
    return `<div class="closing-references">${groups.map((group) => `<section><h2>${group.heading}</h2><ol>${group.ids.map((id) => `<li>${sourceLink(id)}</li>`).join("")}</ol></section>`).join("")}</div><p class="small-note">راهنمای فنی و مقاله پژوهشی کارکرد یکسان ندارند؛ هر منبع باید متناسب با نوع ادعا استفاده شود.</p>`;
  }

  function renderQA() {
    return `
      <div class="qa-layout">
        <section class="qa-prompts">
          <article><span>پرسش ۱</span><p>اگر README فقط نام پروژه را داشته باشد، چه اطلاعاتی برای شروع کار کم است؟</p></article>
          <article><span>پرسش ۲</span><p>README زیبا مهم‌تر است یا README دقیق و قابل اجرا؟ آیا می‌توان هر دو را داشت؟</p></article>
          <article><span>پرسش ۳</span><p>اگر کد تغییر کند اما README به‌روز نشود، چه مشکلاتی ایجاد می‌شود؟</p></article>
        </section>
        <aside class="audience-exercise"><span class="label-line">تمرین کوتاه</span><h2>یک README سه‌بخشی بنویسید</h2><ol><li>عنوان و معرفی پروژه</li><li>فهرست دو قابلیت</li><li>یک دستور اجرا، در صورت مشخص بودن محیط</li></ol><p>پروژه پیشنهادی: ماشین‌حساب ساده</p></aside>
      </div>
      <div class="closing-line">مستندات خوب، همراه با خود نرم‌افزار رشد می‌کنند.</div>`;
  }

  function renderBody(slide) {
    switch (slide.kind) {
      case "sources-opening": return renderOpeningSources();
      case "cover": return renderCover();
      case "problem": return renderProblem();
      case "objectives-method": return renderObjectives();
      case "documentation-types": return renderDocumentationTypes();
      case "readme-definition": return renderReadmeDefinition();
      case "qualities": return renderQualities();
      case "readme-structure": return renderReadmeStructure();
      case "markdown-intro": return renderMarkdownIntro();
      case "markdown-text": return renderMarkdownText();
      case "markdown-elements": return renderMarkdownElements();
      case "markdown-code": return renderMarkdownCode();
      case "build-readme": return renderBuildReadme();
      case "pitfalls-security": return renderPitfalls();
      case "case-study": return renderCaseStudy();
      case "checklist": return renderChecklist();
      case "findings": return renderFindings();
      case "conclusion": return renderConclusion();
      case "sources-closing": return renderClosingSources();
      case "qa": return renderQA();
      default: return `<p>محتوای این اسلاید تعریف نشده است.</p>`;
    }
  }

  function renderSlide() {
    const slide = slides[state.index];
    const slideNumber = state.index + 1;
    const isCover = slide.kind === "cover";
    slideRoot.innerHTML = `
      <article class="slide-frame kind-${escapeHtml(slide.kind)} ${isCover ? "cover-frame" : ""}">
        <div class="slide-heading-row">
          <span class="slide-number">${fa(String(slideNumber).padStart(2, "0"))}</span>
          <span class="slide-section">${escapeHtml(slide.section)}</span>
          <span class="slide-count-mini">${fa(slideNumber)} از ${fa(slides.length)}</span>
        </div>
        ${isCover ? "" : `<h1 class="slide-title">${escapeHtml(slide.title)}</h1>`}
        <div class="slide-body">${renderBody(slide)}</div>
        ${sourceStrip(slide)}
      </article>`;

    $("sectionLabel").textContent = slide.section;
    $("slideCounter").textContent = `${fa(state.index + 1)} / ${fa(slides.length)}`;
    $("slideTopic").textContent = slide.shortTitle || slide.title;
    $("durationCaption").textContent = `زمان پیشنهادی: ${formatDuration(slide.duration)}`;
    $("overallProgressFill").style.width = `${((state.index + 1) / slides.length) * 100}%`;
    $("prevBtn").disabled = state.index === 0;
    $("nextBtn").disabled = state.index === slides.length - 1;
    updateNotes(slide);
    updateTimerDisplay();
  }

  function updateNotes(slide) {
    notesContent.textContent = slide.notes || "برای این اسلاید یادداشتی ثبت نشده است.";
    if (slide.sources?.length) {
      notesSources.innerHTML = `<h3>منابع مرتبط</h3><ul>${slide.sources.map((id) => `<li>${sourceLink(id)}</li>`).join("")}</ul>`;
    } else {
      notesSources.innerHTML = "";
    }
  }

  function updateTimerDisplay() {
    $("totalTimer").textContent = formatTime(state.totalRemaining);
    $("slideTimer").textContent = formatTime(state.slideRemaining);
    playPauseText.textContent = state.started ? "مکث زمان‌سنج" : "شروع زمان‌سنج";
    playPauseIcon.textContent = state.started ? "Ⅱ" : "▶";
    playPauseBtn.setAttribute("aria-pressed", String(state.started));
    playPauseBtn.classList.toggle("is-running", state.started);
  }

  function go(index, resetSlideTimer = true) {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    if (nextIndex === state.index) return;
    state.index = nextIndex;
    if (resetSlideTimer) state.slideRemaining = slides[nextIndex].duration;
    renderSlide();
  }

  function tick() {
    if (!state.started) return;
    state.totalRemaining = Math.max(0, state.totalRemaining - 1);
    state.slideRemaining = Math.max(0, state.slideRemaining - 1);

    if (state.totalRemaining === 0) {
      state.started = false;
      state.slideRemaining = 0;
      showToast("زمان ۲۰ دقیقه‌ای ارائه به پایان رسید.");
      updateTimerDisplay();
      return;
    }

    if (state.slideRemaining === 0) {
      if (state.index < slides.length - 1) {
        state.index += 1;
        state.slideRemaining = slides[state.index].duration;
        renderSlide();
      } else {
        state.started = false;
        updateTimerDisplay();
        showToast("زمان پیشنهادی اسلاید پایانی به پایان رسید.");
        return;
      }
    }
    updateTimerDisplay();
  }

  function toggleTimer() {
    if (state.totalRemaining <= 0) {
      showToast("زمان‌سنج به پایان رسیده است؛ آن را بازنشانی کنید.");
      return;
    }
    state.started = !state.started;
    updateTimerDisplay();
  }

  function resetPresentation() {
    state.started = false;
    state.index = 0;
    state.totalRemaining = totalSeconds;
    state.slideRemaining = slides[0].duration;
    state.checklist = Array(11).fill(false);
    renderSlide();
    showToast("ارائه و زمان‌سنج‌ها بازنشانی شدند.");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(state.toastTimeout);
    state.toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2400);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const temporary = document.createElement("textarea");
        temporary.value = text;
        temporary.setAttribute("readonly", "");
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";
        document.body.appendChild(temporary);
        temporary.select();
        const copied = document.execCommand("copy");
        temporary.remove();
        if (!copied) throw new Error("Copy command failed");
      }
      showToast("متن با موفقیت کپی شد.");
    } catch (error) {
      showToast("کپی خودکار ممکن نشد؛ کد را انتخاب و دستی کپی کنید.");
    }
  }

  function downloadReadme() {
    const blob = new Blob([sampleREADME], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("فایل نمونه README آماده شد.");
  }

  function toggleNotes(force) {
    const shouldShow = typeof force === "boolean" ? force : notesPanel.hidden;
    notesPanel.hidden = !shouldShow;
    $("workspace").classList.toggle("notes-open", shouldShow);
    notesToggle.setAttribute("aria-pressed", String(shouldShow));
    notesToggle.classList.toggle("active", shouldShow);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      const request = document.documentElement.requestFullscreen?.();
      if (request && typeof request.catch === "function") {
        request.catch(() => showToast("مرورگر اجازه نمایش تمام‌صفحه را نداد."));
      }
    } else {
      document.exitFullscreen?.().catch?.(() => {});
    }
  }

  function updateChecklistProgress() {
    const completed = state.checklist.filter(Boolean).length;
    const count = $("checklistCount");
    const fill = $("checklistMeterFill");
    if (count) count.textContent = `${fa(completed)} از ۱۱`;
    if (fill) fill.style.width = `${(completed / 11) * 100}%`;
  }

  function handleClick(event) {
    const copyButton = event.target.closest("[data-copy-target]");
    if (copyButton) {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      if (target) copyText(target.innerText);
      return;
    }

    const previewButton = event.target.closest("[data-preview-toggle]");
    if (previewButton) {
      const key = previewButton.dataset.previewToggle;
      const preview = document.querySelector(`[data-preview="${CSS.escape(key)}"]`);
      if (preview) {
        const willHide = !preview.classList.contains("preview-hidden");
        preview.classList.toggle("preview-hidden", willHide);
        previewButton.textContent = willHide ? "نمایش پیش‌نمایش" : "پنهان کردن پیش‌نمایش";
      }
      return;
    }

    if (event.target.closest("#downloadReadmeBtn")) {
      downloadReadme();
      return;
    }

    if (event.target.closest("#resetChecklistBtn")) {
      state.checklist = Array(11).fill(false);
      document.querySelectorAll("[data-checklist-index]").forEach((input) => { input.checked = false; });
      updateChecklistProgress();
      showToast("چک‌لیست از نو شروع شد.");
      return;
    }

    const checkbox = event.target.closest("[data-checklist-index]");
    if (checkbox) {
      const index = Number(checkbox.dataset.checklistIndex);
      state.checklist[index] = checkbox.checked;
      updateChecklistProgress();
    }
  }

  $("prevBtn").addEventListener("click", () => go(state.index - 1));
  $("nextBtn").addEventListener("click", () => go(state.index + 1));
  playPauseBtn.addEventListener("click", toggleTimer);
  $("resetBtn").addEventListener("click", resetPresentation);
  $("endBtn").addEventListener("click", () => {
    state.started = false;
    go(slides.length - 1);
    updateTimerDisplay();
  });
  notesToggle.addEventListener("click", () => toggleNotes());
  $("notesClose").addEventListener("click", () => toggleNotes(false));
  $("fullscreenBtn").addEventListener("click", toggleFullscreen);
  $("brandHome").addEventListener("click", (event) => { event.preventDefault(); go(0); });
  slideRoot.addEventListener("click", handleClick);
  slideRoot.addEventListener("change", handleClick);

  document.addEventListener("keydown", (event) => {
    const activeTag = document.activeElement?.tagName;
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(activeTag) || document.activeElement?.isContentEditable;
    if (isTyping || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      go(state.index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      go(state.index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      go(0);
    } else if (event.key === "End") {
      event.preventDefault();
      state.started = false;
      go(slides.length - 1);
      updateTimerDisplay();
    } else if (event.key === " " && !["BUTTON", "A"].includes(activeTag)) {
      event.preventDefault();
      toggleTimer();
    } else if (event.key.toLowerCase() === "f") {
      toggleFullscreen();
    } else if (event.key.toLowerCase() === "n") {
      toggleNotes();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = Boolean(document.fullscreenElement);
    $("fullscreenBtn").classList.toggle("active", isFullscreen);
    $("fullscreenBtn").title = isFullscreen ? "خروج از تمام‌صفحه" : "نمایش تمام‌صفحه";
  });

  window.setInterval(tick, 1000);
  renderSlide();
})();

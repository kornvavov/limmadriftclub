


/* === components === */
/* LIMMA DRIFT CLUB — section components */

const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ---------- helpers ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  });
}

/* ---------- HERO ---------- */
function Hero() {
  // generate streaks once
  const streaks = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        top: 20 + i * 10 + Math.random() * 4,
        delay: -Math.random() * 8,
        dur: 6 + Math.random() * 6,
        opacity: 0.4 + Math.random() * 0.5,
        width: 30 + Math.random() * 50,
      })),
    []
  );

  // particles
  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, () => ({
        x: Math.random() * 100,
        y: 30 + Math.random() * 70,
        size: 2 + Math.random() * 5,
        dur: 8 + Math.random() * 12,
        delay: -Math.random() * 12,
        drift: -20 + Math.random() * 40,
      })),
    []
  );

  return (
    <section className="hero" id="top">
      <div className="hero-stage">
        <video
          className="hero-video"
          autoPlay
          muted
          defaultMuted
          loop
          playsInline
          preload="auto"
          ref={(el) => {
            if (!el) return;
            el.muted = true;
            el.setAttribute('muted', '');
            el.addEventListener('canplay', () => el.play().catch(()=>{}), { once: true });
            el.load();
          }}
        >
          <source src="assets/hero.webm" type="video/webm" />
          <source src="assets/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="smoke"></div>
      <div className="streaks">
        {streaks.map((s, i) => (
          <div
            key={i}
            className="streak"
            style={{
              top: `${s.top}%`,
              width: `${s.width}vw`,
              opacity: s.opacity,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          ></div>
        ))}
      </div>
      <div className="particles">
        {particles.map((p, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "rgba(255,255,255,0.5)",
              borderRadius: "50%",
              filter: "blur(1px)",
              opacity: 0.4,
              animation: `particleFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
              "--drift": `${p.drift}px`,
            }}
          ></span>
        ))}
      </div>
      <div className="hero-grain"></div>

      <div className="hero-content container">


        <h1>
          Премиальный <span className="ital">дрифт-клуб</span>
          <br />
          в <span className="accent">Москве.</span>
        </h1>

        <p className="hero-sub">
          <strong>AMG и M-серия</strong> на профессиональном треке. Без компромиссов. Только трасса, дым и ты.
        </p>

        <div className="hero-cta">
          <a href="#suth" className="btn btn-ghost">
            Подробнее <span className="arrow">↓</span>
          </a>
        </div>

      </div>

      <div className="hero-tag-bottom">
        N 55°45′ E 37°37′ &nbsp;·&nbsp; AMG · M-Series
      </div>
      <div className="hero-telemetry">
        <div><span className="live">● LIVE</span> &nbsp; Track: Open</div>
        <div>Surface: dry &nbsp;·&nbsp; 12°C</div>
        <div>Next session: 18:00</div>
      </div>

      <style>{`
        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(var(--drift), -40px); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee() {
  const text = (
    <span>
      Закрытый трек <span className="sep">◆</span> AMG · M-Series <span className="sep">◆</span> Персональный инструктор <span className="sep">◆</span> Кино-съёмка <span className="sep">◆</span> Москва · 2026 <span className="sep">◆</span>&nbsp;
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {text}{text}{text}
      </div>
    </div>
  );
}

/* ---------- SUTH (value props) ---------- */
function Suth() {
  const items = [
    {
      num: "01",
      title: "Закрытый трек",
      body: "Профессиональная площадка в черте Москвы. Без зрителей и формальностей.",
    },
    {
      num: "02",
      title: "Всё включено",
      body: "Машина, резина, экипировка, страховка. Приходи как есть.",
    },
    {
      num: "03",
      title: "Полная свобода",
      body: "Никаких нудных рамок обучения, только вы и автомобиль.",
    },
    {
      num: "04",
      title: "Создание контента",
      body: "Фото, Reels, дронные кадры. Готовый материал в твой Instagram.",
    },
    {
      num: "05",
      title: "Полная безопасность",
      body: "Вы в абсолютно безопасной среде научитесь ощущать автомобиль, что прокачает вашу безопасность и в повседневных поездках.",
    },
  ];
  return (
    <section className="suth section-pad" id="suth">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <div className="eyebrow">01 / Концепция</div>
            <h2 className="display">
              Это не покатушки. <span style={{ color: "var(--fg-dim)", fontStyle: "italic", fontSize: "0.78em", whiteSpace: "nowrap" }}>Это эмоции.</span>
            </h2>
          </div>
          <div className="meta">
            всё включено<br />ничего не надо
          </div>
        </div>

        <div className="suth-grid reveal">
          {items.map((it) => (
            <div key={it.num} className="suth-cell">
              <div className="num">{it.num}</div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AUTOPARK ---------- */
function Autopark() {
  const cars = [
    {
      title: "C63 S AMG COUPE EDITION ONE",
      spec: "Mercedes-AMG · V8 BiTurbo · 510 л.с.",
      photos: ["assets/autopark_c63_1.webp", "assets/autopark_c63_2.webp"],
    },
    {
      title: "M5 COMPETITION STAGE 1+",
      spec: "BMW M5 F90 · V8 BiTurbo · 720+ л.с.",
      photos: ["assets/autopark_m5_1.webp", "assets/autopark_m5_2.webp"],
    },
    {
      title: "Секретный гость нашего автопарка",
      spec: null,
      secret: true,
      photos: ["assets/autopark_secret_1.webp", "assets/autopark_secret_2.webp"],
    },
  ];

  // duplicate for seamless infinite scroll
  const loop = [...cars, ...cars];

  return (
    <section className="autopark section-pad" id="autopark">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <div className="eyebrow">02 / Автопарк</div>
            <h2 className="display">
              То, <span style={{ fontStyle: "italic", color: "var(--fg-dim)" }}>ради чего к нам приезжают</span>
            </h2>
          </div>
          <div className="meta">эксклюзивный парк · 2026</div>
        </div>
      </div>

      <div className="autopark-track-wrap reveal" aria-label="Карусель автопарка">
        <div className="autopark-track">
          {loop.map((c, i) => (
            <article key={i} className={`autopark-card ${c.secret ? "is-secret" : ""}`}>
              <div className="autopark-photos">
                {c.photos.map((p, j) => (
                  <div key={j} className="autopark-photo">
                    <img src={p} alt={c.secret ? "Секретный автомобиль" : c.title} loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="autopark-body">
                <div className="autopark-eyebrow">{c.secret ? "Coming soon" : `0${(i % cars.length) + 1} · в парке`}</div>
                <h3 className="autopark-title">{c.title}</h3>
                {c.spec && <div className="autopark-spec">{c.spec}</div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
function Process() {
  const steps = [
    { n: "01", h: "Оставляешь заявку", p: "В форме на сайте или в Telegram. Отвечаем в течение часа." },
    { n: "02", h: "Подбираем формат", p: "Созваниваемся, собираем твой сценарий — машина, длительность, контент." },
    { n: "03", h: "Приезжаешь на трек", p: "Москва. Закрытая площадка. Без зрителей." },
    { n: "04", h: "Инструктор объясняет базу", p: "Посадка, руль, газ, занос. Управляемо, без риска." },
    { n: "05", h: "Практика за рулём", p: "Заезды по 30 минут. Между сессиями — разбор и отдых." },
    { n: "06", h: "Создание контента", p: "Фото-видео команда работает в потоке твоего заезда." },
    { n: "07", h: "Фотосессия", p: "Опционально. В свободное время от сеанса." },
  ];
  return (
    <section className="process section-pad" id="process">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <div className="eyebrow">02 / Сценарий</div>
            <h2 className="display">
              Как это <span style={{ fontStyle: "italic", color: "var(--fg-dim)" }}>проходит</span>
            </h2>
          </div>
          <div className="meta">7 шагов · ~3 часа на треке</div>
        </div>

        <div className="process-list reveal">
          {steps.map((s) => (
            <div key={s.n} className="process-step">
              <div className="num">{s.n}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
              <div className="icon">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES (single signature service) ---------- */
function Pricing() {
  const includedAll = [
    "автомобили клуба",
    "топливо",
    "резина",
    "обслуживание",
    "организация выездов",
    "съёмка контента",
  ];
  const services = [
    {
      eyebrow: "01 · Passenger",
      photoLabel: "PHOTO · 4:5",
      photoHint: "Passenger",
      photo: "assets/1.jpg",
      title: ["PASSENGER"],
      lead: "Формат для тех, кто хочет почувствовать настоящий дрифт и атмосферу клуба без необходимости самому садиться за руль.",
      features: [
        { t: "2 выезда на трек в месяц" },
        { t: "до 30 минут трекового времени за выезд" },
        { t: "дрифт с профессиональным пилотом на автомобилях клуба" },
        { t: "пассажирские заезды боком по треку" },
        { t: "профессиональная съёмка", sub: ["reels", "onboard"] },
        { t: "атмосферные кадры" },
        { t: "доступ в закрытый Telegram клуба" },
        { t: "участие в клубной атмосфере и мероприятиях" },
        { t: "возможность пригласить 1 гостя на выезд" },
      ],
      included: includedAll,
      tag: "Атмосфера и эмоции",
    },
    {
      eyebrow: "02 · Driver",
      photoLabel: "PHOTO · 4:5",
      photoHint: "Driver",
      photo: "assets/3.jpg",
      title: ["DRIVER"],
      lead: "Формат для тех, кто хочет уже самостоятельно почувствовать управление автомобилем в заносе.",
      features: [
        { t: "3 выезда на трек в месяц" },
        { t: "до 30 минут трекового времени за выезд" },
        { t: "самостоятельное управление автомобилем под контролем инструктора" },
        { t: "обучение", sub: ["постановке", "удержанию угла", "перекладкам", "базовому контролю в заносе"] },
        { t: "профессиональная съёмка", sub: ["reels", "onboard"] },
        { t: "атмосферные кадры" },
        { t: "приоритетная запись на выезды" },
        { t: "доступ в закрытый Telegram клуба" },
        { t: "участие в закрытых мероприятиях клуба" },
        { t: "возможность пригласить 1 гостя на выезд" },
      ],
      included: includedAll,
      tag: "Самостоятельно за рулём",
    },
    {
      eyebrow: "03 · Apex",
      photoLabel: "PHOTO · 4:5",
      photoHint: "Apex",
      photo: "assets/4.jpg",
      title: ["APEX"],
      lead: "Максимальный уровень участия в LIMMA DRIFT CLUB.",
      features: [
        { t: "3 выезда на трек в месяц" },
        { t: "до 30 минут трекового времени за выезд" },
        { t: "доступ к нескольким автомобилям клуба" },
        { t: "возможность менять автомобили" },
        { t: "индивидуальные и ночные выезды" },
        { t: "персональная работа с инструктором" },
        { t: "максимальный приоритет записи" },
        { t: "расширенная профессиональная съёмка" },
        { t: "персональные reels и видео" },
        { t: "отдельный контент во время выездов" },
        { t: "лимитированный мерч клуба" },
        { t: "участие в закрытых мероприятиях клуба" },
        { t: "ранний доступ к новым автомобилям клуба" },
      ],
      included: includedAll,
      tag: "Максимум клуба",
    },
  ];

  const [active, setActive] = useState(1);
  const last = services.length - 1;
  const prev = () => setActive((i) => (i - 1 + services.length) % services.length);
  const next = () => setActive((i) => (i + 1) % services.length);

  return (
    <section className="section-pad" id="pricing" style={{ background: "linear-gradient(180deg, var(--bg) 0%, #050505 100%)" }}>
      <div className="container">
        <div className="section-header reveal">
          <div>
            <div className="eyebrow">03 / Услуги</div>
            <h2 className="display">
              Один день, <span style={{ fontStyle: "italic", color: "var(--fg-dim)" }}>который вы не забудете</span>
            </h2>
          </div>
          <div className="meta">{String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</div>
        </div>

        <div className="svc-slider reveal">
          <div className="svc-stage">
            {services.map((s, i) => (
              <div
                key={i}
                className={`svc-card ${i === active ? "is-active" : ""} ${i < active ? "is-prev" : ""}`}
                aria-hidden={i !== active}
              >
                <article className="svc-hero">
                  <div className="svc-hero-photo" aria-label="Место для фотографии">
                    {s.photo && (
                      <img
                        className="svc-hero-photo-img"
                        src={s.photo}
                        alt={s.photoHint}
                      />
                    )}
                    <div className="svc-hero-photo-grid"></div>
                    <div className="svc-hero-photo-label mono">{s.photoLabel}</div>
                    <div className="svc-hero-photo-hint mono">{s.photoHint}</div>
                  </div>
                  <div className="svc-hero-content">
                    <div className="svc-hero-eyebrow mono">{s.eyebrow}</div>
                    <h3 className="svc-hero-title display">
                      {s.title[0]}
                      {s.title[1] && (
                        <span style={{ color: "var(--fg-dim)", fontStyle: "italic", fontWeight: 300 }}>{s.title[1]}</span>
                      )}
                      {s.title[2] || ""}
                    </h3>
                    <p className="svc-hero-lead">{s.lead}</p>
                    {s.features && (
                      <div className="svc-hero-features">
                        <div className="svc-hero-features-title mono">Вы получаете</div>
                        <ul className="svc-hero-features-list">
                          {s.features.map((f, k) => (
                            <li key={k} className={f.sub ? "has-sub" : ""}>
                              <span className="t">{f.t}</span>
                              {f.sub && (
                                <ul className="svc-hero-features-sub">
                                  {f.sub.map((sb, kk) => (
                                    <li key={kk}>{sb}</li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {s.included && (
                      <div className="svc-hero-included">
                        <div className="svc-hero-included-title mono">В стоимость входит</div>
                        <div className="svc-hero-included-tags">
                          {s.included.map((it, k) => (
                            <span key={k} className="svc-hero-included-tag mono">{it}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <nav className="svc-nav" aria-label="Выбор услуги">
                      {services.map((sv, si) => (
                        <button
                          key={si}
                          className={`svc-nav-item ${si === active ? "is-active" : ""}`}
                          onClick={() => setActive(si)}
                        >
                          <span className="svc-nav-num mono">{String(si + 1).padStart(2, "0")}</span>
                          <span className="svc-nav-name">{sv.photoHint}</span>
                          <span className="svc-nav-arrow">{si === active ? "→" : ""}</span>
                        </button>
                      ))}
                    </nav>
                    <div className="svc-hero-cta">
                      <a
                        href="https://t.me/managerlimma"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Записаться <span className="arrow">→</span>
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}

/* ---------- AUDIENCE ---------- */
function Audience() {
  const cards = [
    { n: "01", t: "Начинающий", b: "Прав нет, опыта нет, желания — на максимум. Идеальный старт." },
    { n: "02", t: "Любитель авто", b: "Приобрел мощную машину, но не уверен в своих навыках контр-аварийных мер и хочешь прокачать чувство контроля над авто." },
    { n: "03", t: "Продал спорткар", b: "Прокачка эмоций без владения. Адреналин в чистом виде." },
    { n: "04", t: "Блогер / инфлюенсер", b: "Контент, который соберёт виралы. Готовый продакшн под ключ." },
    { n: "05", t: "Бизнес и команды", b: "Тимбилдинг, который запомнят. Корпоративный формат с брендингом." },
    { n: "06", t: "Получил в подарок", b: "Сертификат, упакованный как ритуал. Не носки, не цветы." },
  ];
  return (
    <section className="section-pad" id="audience">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <div className="eyebrow">04 / Кому</div>
            <h2 className="display">
              Кто здесь <span style={{ fontStyle: "italic", color: "var(--fg-dim)" }}>оказывается</span>
            </h2>
          </div>
          <div className="meta">6 архетипов</div>
        </div>

        <div className="aud-grid reveal">
          {cards.map((c) => (
            <article key={c.n} className="aud-card">
              <div className="num">{c.n}</div>
              <h3>{c.t}</h3>
              <p>{c.b}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GALLERY ---------- */
const galleryItems = [
  { id: 1, label: "Apex / 12.04", type: "video", ph: "ph-1", title: "Управляемый занос. С первой попытки.", span: "span-c5 span-r2", featureMobile: true },
  { id: 2, label: "AMG GT-S", type: "photo", ph: "ph-4", title: "Студийная фотосессия после заезда.", span: "span-c4 span-r2" },
  { id: 3, label: "Reels", type: "reels", ph: "ph-2", title: "5,2M просмотров. Снято за 30 минут.", span: "span-c3 span-r2" },
  { id: 4, label: "Pit / 03.04", type: "photo", ph: "ph-3", title: "Между заездами. Дым ещё не осел.", span: "span-c4" },
  { id: 5, label: "M3 Comp", type: "video", ph: "ph-5", title: "Связка восьмёркой. Третий заезд.", span: "span-c4" },
  { id: 6, label: "Drone", type: "photo", ph: "ph-6", title: "Вид сверху. Закрытый трек.", span: "span-c4" },
  { id: 7, label: "Reels", type: "reels", ph: "ph-1", title: "Трейлер дня. Публикуется в твой аккаунт.", span: "span-c6" },
  { id: 8, label: "M2 Comp", type: "photo", ph: "ph-2", title: "Тренировочный аппарат для новичков.", span: "span-c6" },
];

function Gallery({ onOpen }) {
  return (
    <section className="section-pad" id="gallery" style={{ background: "#050505" }}>
      <div className="container">
        <div className="section-header reveal">
          <div>
            <div className="eyebrow">05 / Контент</div>
            <h2 className="display">
              Материал, который <br />
              <span style={{ fontStyle: "italic", color: "var(--fg-dim)" }}>остаётся с тобой</span>
            </h2>
          </div>
          <div className="meta">фото · видео · reels</div>
        </div>

        <div className="gal-grid reveal">
          {galleryItems.map((g, idx) => (
            <button
              key={g.id}
              className={`gal-item ${g.span} ${g.type === "reels" ? "reels" : ""} ${g.featureMobile ? "feature-mobile" : ""}`}
              onClick={() => onOpen(idx)}
              aria-label={`Открыть: ${g.title}`}
            >
              <div className={`placeholder ${g.ph}`}></div>
              <div className="pill">{g.type === "reels" ? "Reels" : g.type === "video" ? "Video" : "Photo"}</div>
              <div className="label">{g.label}</div>
              {g.type !== "photo" && (
                <div style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#fff"
                  }}>▶</div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY ---------- */
function Why() {
  const items = [
    { n: "01", h: "10+ лет в дрифте", p: "Мы знаем свое дело :)" },
    { n: "02", h: "Эксклюзивный автопарк", p: "Уникальный опыт на настоящих гражданских автомобилях." },
    { n: "03", h: "Безопасность в первую очередь", p: "Закрытая площадка. Шлемы, ремни, страховка. Проводим по протоколу." },
    { n: "04", h: "Полная организация", p: "Тебе остаётся только приехать. Всё остальное — на нас." },
  ];
  return (
    <section className="section-pad" id="why">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <div className="eyebrow">06 / Доверие</div>
            <h2 className="display">Почему мы</h2>
          </div>
          <div className="meta">5 причин · 0 компромиссов</div>
        </div>

        <div className="why-grid">
          <div className="why-portrait reveal">
            <img src="assets/2.jpg" alt="LIMMA" className="why-portrait-img" />
            <div className="why-portrait-meta">
              LIMMA<br />FOUNDER · INSTRUCTOR
            </div>
          </div>
          <div className="why-list reveal">
            {items.map((it) => (
              <div key={it.n} className="why-item">
                <div className="num">{it.n}</div>
                <div>
                  <h4>{it.h}</h4>
                  <p>{it.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    { q: "Можно ли без прав?", a: "Да. Это закрытая частная площадка — права не нужны. Главное — желание и хорошее настроение." },
    { q: "Это безопасно?", a: "Да. Машины оборудованы каркасом и ремнями, ты в шлеме, инструктор рядом. Скорости управляемые, площадка закрытая. За 5+ лет — ноль серьёзных инцидентов." },
    { q: "Что брать с собой?", a: "Ничего. Удобную одежду и обувь. Шлем, перчатки, балаклаву — выдадим. Воду и кофе — тоже на нас." },
    { q: "А если я не хочу попадать на видео?", a: "Без проблем. Снимаем только тех, кто хочет. По желанию — полностью без камеры, только лично для тебя." },
    { q: "Можно ли подарить сертификат?", a: "Да. Делаем красивые именные сертификаты на PASSENGER / DRIVER / APEX. С упаковкой и доставкой." },
    { q: "А если идёт дождь?", a: "Дрифт по мокрой — это база. Если совсем шквал — переносим на удобную дату без вопросов." },
  ];

  const [open, setOpen] = useState(0);
  return (
    <section className="section-pad" id="faq">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <div className="eyebrow">07 / Вопросы</div>
            <h2 className="display">FAQ</h2>
          </div>
          <div className="meta">всё, что обычно спрашивают</div>
        </div>

        <div className="faq reveal">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="plus">+</span>
              </button>
              <div className="faq-a">
                <p>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





/* ---------- MERCH ---------- */
function Merch() {
  const images = [
    "assets/merch/magnific_.-.-.-.-bmw-m5-f90-limma-_2918242523.webp",
    "assets/merch/magnific_2918480066.webp",
    "assets/merch/magnific_.-.-.-.-bmw-m5-f90-limma-_2918245250.webp",
    "assets/merch/magnific_2918516247.webp",
    "assets/merch/magnific_2918556521.webp",
    "assets/merch/magnific_2918571451.webp",
  ];
  return (
    <section className="merch section-pad" id="merch">
      <div className="container">
        <div className="section-header reveal">
          <div>
            <div className="eyebrow">08 / Мерч</div>
            <h2 className="display">
              Только для <span style={{ fontStyle: "italic", color: "var(--fg-dim)" }}>участников клуба</span>
            </h2>
          </div>
          <div className="meta">drop · 2026</div>
        </div>

        <div className="merch-grid reveal">
          <div className="merch-collage">
            {images.map((src, i) => (
              <div key={i} className={`merch-collage-item m-${i + 1}`}>
                <img src={src} alt={`Мерч LIMMA Drift Club ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          <div className="merch-aside">
            <p className="merch-aside-lead">
              Худи, футболки и аксессуары LIMMA Drift Club — только для тех, кто был на треке.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <div className="legal">
          © LIMMA Drift Club, 2026 · Москва
        </div>
        <div className="links">
          <a href="https://t.me/managerlimma" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://www.instagram.com/limma.performance/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="mailto:limma.group@mail.ru">limma.group@mail.ru</a>
        </div>
      </div>
    </footer>
  );
}


/* ---------- LIGHTBOX ---------- */
function Lightbox({ idx, onClose, onPrev, onNext }) {
  const open = idx !== null;
  const item = open ? galleryItems[idx] : null;

  useEffect(() => {
    function key(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    if (open) document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open, onClose, onPrev, onNext]);

  // swipe
  const startX = useRef(null);
  function ts(e) { startX.current = e.touches[0].clientX; }
  function te(e) {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 40) onPrev();
    else if (dx < -40) onNext();
    startX.current = null;
  }

  return (
    <div className={`lb-back ${open ? "show" : ""}`} onClick={onClose}>
      {item && (
        <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
          <button className="lb-close" onClick={onClose}>Закрыть ✕</button>
          <button className="lb-nav prev" onClick={onPrev} aria-label="Назад">←</button>
          <button className="lb-nav next" onClick={onNext} aria-label="Вперёд">→</button>
          <div className="lb-frame" onTouchStart={ts} onTouchEnd={te}>
            <div className={`lb-content ${item.ph}`}></div>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.85))"
            }}></div>
            {item.type !== "photo" && (
              <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                width: 72, height: 72, borderRadius: "50%",
                background: "rgba(201,194,179,0.92)", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#0a0a0a", fontSize: 24, zIndex: 3
              }}>▶</div>
            )}
            <div className="lb-meta">
              <div className="h">{item.title}</div>
              <div className="s">{item.label} · {item.type}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* expose */
Object.assign(window, {
  Hero, Marquee, Suth, Autopark, Process, Pricing, Audience, Gallery, Why, FAQ, Merch, Footer,
  Lightbox, useReveal, galleryItems
});


/* === app === */
/* LIMMA DRIFT CLUB — main app */

/* using useState/useEffect from components scope */


/* ---- Single integrated root ---- */
function Root() {
  const [stickyShow, setStickyShow] = useState(false);

  useReveal();

  useEffect(() => {
    const nav = document.getElementById("nav");
    const prog = document.getElementById("scrollProgress");
    function onScroll() {
      const y = window.scrollY;
      if (nav) nav.classList.toggle("scrolled", y > 40);
      if (prog) {
        const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
        prog.style.width = `${Math.min(100, (y / max) * 100)}%`;
      }
      setStickyShow(y > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("stickyCta");
    if (!el) return;
    el.classList.toggle("show", stickyShow);
  }, [stickyShow]);

  useEffect(() => {
    const el = document.getElementById("stickyCta");
    if (!el) return;
    let timer = null;
    function onMove() {
      el.classList.add("is-active");
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove("is-active"), 700);
    }
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("pointermove", onMove);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <Hero />
      <Marquee />
      <Suth />
      <Autopark />
      <Process />
      <Audience />
      <Why />
      <Pricing />
      <FAQ />
      <Merch />
      <Footer />
    </React.Fragment>
  );
}

/* mount */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);


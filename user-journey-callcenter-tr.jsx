import { useState } from "react";

const stages = [
  {
    id: 1,
    label: "Çağrı Alındı",
    icon: "📞",
    color: "#4FC3F7",
    actions: ["Gelen çağrı bildirimi ekranda belirir", "Temsilci arayan kimliğini ve geçmişini inceler", "Temsilci çağrıyı kabul eder"],
    thoughts: ["Bu arayan kim?", "Hakkında bilgim var mı?", "Hazır olmalıyım"],
    emotions: ["Nötr", "Uyanık", "Odaklı"],
    emojiEmotion: "😐",
    assistantRole: "Arayanın geçmişini ve hesap bilgilerini otomatik olarak ekrana getirir.",
    painPoints: ["Arayan hakkında önceden bağlam yok", "Aynı anda birden fazla sisteme bakılması gerekiyor"],
    touchpoints: ["Çağrı platformu arayüzü", "CRM paneli", "Yapay zeka asistan paneli"],
  },
  {
    id: 2,
    label: "Aktif Dinleme",
    icon: "🎧",
    color: "#81C784",
    actions: ["Temsilci müşteriyi karşılar ve konuşmaya başlar", "Temsilci dinler ve yanıt verir", "Konuşma doğal biçimde akar"],
    thoughts: ["Bunu nasıl çözebilirim?", "Kendimi yeterince net ifade ediyor muyum?", "Durum tırmanıyor mu?"],
    emotions: ["Katılımlı", "Biraz Baskı Altında", "Dikkatli"],
    emojiEmotion: "🤔",
    assistantRole: "Gerçek zamanlı dinler, ton ve tempo hakkında ince geri bildirimler verir (ör. 'Yavaşlayın', 'Çok gayri resmi').",
    painPoints: ["Sorunu çözerken kendi tonunu izlemek zor", "Konuşma ortasında kritik bilgi kaçırılabiliyor"],
    touchpoints: ["Canlı transkript", "Ton göstergesi", "Gerçek zamanlı öneri şeridi"],
  },
  {
    id: 3,
    label: "Açılış Geri Bildirimi",
    icon: "📋",
    color: "#F06292",
    actions: ["Asistan çağrı açılışını değerlendirir", "Ekranda geri bildirim kartı belirir", "Temsilci ipuçlarını okur ve onaylar"],
    thoughts: ["Karşılamam yeterince iyi miydi?", "Kendinden emin göründüm mü?", "Ne değiştirmeliyim?"],
    emotions: ["Meraklı", "Alıcı", "Öz-farkında"],
    emojiEmotion: "🧐",
    assistantRole: "Çağrı açılışını ton, karşılama formülü, empati düzeyi ve tempo açısından puanlar. 'Müşterinin adını daha erken kullanın' veya 'Açılışınız çok aceleciydi' gibi hızlı ipuçları gösterir.",
    painPoints: ["Geri bildirim çağrı ortasında dikkat dağıtıcı olabilir", "Konuşurken ipuçlarını özümsemek zor", "Tonu ani düzeltme riski"],
    touchpoints: ["Açılış puan kartı", "Satır içi geri bildirim katmanı", "Kapat / ertele düğmesi"],
  },
  {
    id: 4,
    label: "İsim Kullanım Uyarısı",
    icon: "🏷️",
    color: "#FFD54F",
    actions: ["Asistan müşteri adının kullanım sıklığını takip eder", "Ekranda uyarı veya dürtü belirir", "Temsilci isim kullanımını doğal biçimde ayarlar"],
    thoughts: ["Adını çok mu söylüyorum?", "Doğal mı yoksa robotik mi duyuluyor?", "Daha kişisel bir dokunuş katmalıyım"],
    emotions: ["Şaşırmış", "Öz-farkında", "Uyum Sağlıyor"],
    emojiEmotion: "😲",
    assistantRole: "Müşteri adının kullanım sıklığını gerçek zamanlı sayar. Aşırı kullanımda ('Adı 2 dakikada 6 kez söylediniz') veya az kullanımda ('Bağ kurmak için adını kullanın') uyarı verir. Doğal kullanım noktaları önerir.",
    painPoints: ["Temsilci o an tekrarın farkında değil", "Aşırı kullanım senaryoya göre robotik ve samimiyetsiz duyulur", "Az kullanım görüşmeyi kişiliksiz hissettirir"],
    touchpoints: ["İsim sıklığı sayacı", "İnce uyarı rozeti", "Satır içi koçluk dürtüsü"],
  },
  {
    id: 5,
    label: "Temsilci Yardım İstiyor",
    icon: "🆘",
    color: "#FFB74D",
    actions: ["Temsilci 'Yardım' düğmesine basar veya soru yazar", "Asistana sesli ya da yazılı olarak soru sorar", "Önerileri taramak için kısa bir ara verir"],
    thoughts: ["Bu sorunun yanıtını bilmiyorum", "Hızlıca bir politika veya prosedüre ihtiyacım var", "Burada söylemem gereken doğru şey nedir?"],
    emotions: ["Belirsiz", "Biraz Endişeli", "Umutlu"],
    emojiEmotion: "😟",
    assistantRole: "Cevaplanmayan müşteri sorularını tespit eder. Yanıtları, komut dosyalarını veya politika belgelerini proaktif olarak sunar.",
    painPoints: ["Çağrıda sessizlik garip hissettiriyor", "Doğru yanıtı hızla bulmak zor", "Yanlış bilgi verme korkusu"],
    touchpoints: ["Yardım düğmesi", "Asistan sohbet girişi", "Bilgi tabanı önerileri"],
  },
  {
    id: 6,
    label: "Asistan Yanıt Veriyor",
    icon: "🤖",
    color: "#CE93D8",
    actions: ["Asistan yanıt veya öneri sunar", "Temsilci tavsiyeyi okur ve uygular", "Temsilci çağrıya devam eder veya yönlendirir"],
    thoughts: ["Tamam, bunu kullanabilirim", "Bunu doğal biçimde ifade etmeliyim", "Çok hızlıydı"],
    emotions: ["Rahatlamış", "Kendinden Emin", "Tekrar Akışta"],
    emojiEmotion: "😌",
    assistantRole: "Net ve özlü yanıtlar sunar. Eskalasyon gereken durumları işaretler. Ton koçluğu yapar (ör. 'Hayal kırıklığınızı tamamen anlıyorum').",
    painPoints: ["Yanıt çağrı ortasında taramak için çok uzun", "Öneri duruma uymuyor", "Yanıtı senaryosuz kullanmak zor"],
    touchpoints: ["Asistan yanıt kartı", "Panoya kopyala", "Eskalasyon bayrağı"],
  },
  {
    id: 7,
    label: "Temsilci Yazarak Soru Soruyor",
    icon: "✍️",
    color: "#80CBC4",
    actions: ["Temsilci metin girişi panelini açar", "Asistana sessizce soru yazar", "Çağrıyı kesmeden mesajı gönderir"],
    thoughts: ["Bu konuda daha fazla detay gerekiyor", "Bunu sesli soramam", "Hızlıca yazayım"],
    emotions: ["Odaklı", "Temkinli", "Meraklı"],
    emojiEmotion: "🤫",
    assistantRole: "Temsilcinin canlı çağrı sürerken özel sorular sorabileceği sessiz bir metin kanalı sağlar. Yazılan sorguları konuşma bağlamında anlayıp işler.",
    painPoints: ["Konuşurken yazmak bilişsel açıdan zorlayıcı", "Müşteriye odaklanmanın kaybolma riski", "Baskı altında küçük giriş alanı kullanımı zor"],
    touchpoints: ["Metin girişi paneli", "Küçültülmüş sohbet çekmecesi", "Paneli açmak için klavye kısayolu"],
  },
  {
    id: 8,
    label: "Asistan Yazılı Yanıt Veriyor",
    icon: "💬",
    color: "#A5D6A7",
    actions: ["Asistan yazılan soruyu okur", "Kısa ve öz bir metin yanıtı oluşturur", "Temsilci yanıtı okur ve çağrıya uygular"],
    thoughts: ["Mükemmel, bu soruyu yanıtladı", "Bununla çalışabilirim", "Müşteriyi beklemeye almama gerek yok"],
    emotions: ["Memnun", "Kendinden Emin", "Kontrolde"],
    emojiEmotion: "😎",
    assistantRole: "Kısa ve taranabilir bir yanıt verir: politika özeti, önerilen ifade veya doğrudan bilgi. Hızlı okuma için biçimlendirilir: madde işaretleri, kalın anahtar bilgi, en fazla 3 satır.",
    painPoints: ["Çağrı ortasında okunmak için yanıt çok uzun", "Yanıt çok yavaş geliyor", "Konuşurken bildirimi kaçırma riski"],
    touchpoints: ["Metin yanıt balonu", "Kalın anahtar bilgi biçimlendirmesi", "Sohbet panelinde bildirim rozeti"],
  },
  {
    id: 9,
    label: "Çağrı Çözüldü",
    icon: "✅",
    color: "#4DB6AC",
    actions: ["Temsilci çağrıyı kapatır", "Çağrı sona erer", "Temsilci çağrı sonrası özeti inceler"],
    thoughts: ["Bunu iyi yönettim mi?", "Neyi geliştirebilirdim?", "Ne kadar sürdü?"],
    emotions: ["Başarılı", "Düşünceli", "Bir Sonraki Çağrıya Hazır"],
    emojiEmotion: "😊",
    assistantRole: "Çağrı özeti, kalite puanı ve koçluk ipuçları oluşturur. CRM notlarını otomatik doldurur.",
    painPoints: ["Manuel not alma zaman alıcı", "Performans geri bildirim döngüsü yok", "Düşünmeden hızla sonraki çağrıya geçme"],
    touchpoints: ["Çağrı sonrası özet paneli", "Kalite puan kartı", "CRM otomatik doldurma", "Koçluk ipuçları"],
  },
];

const rowLabels = [
  { key: "actions", label: "Eylemler", icon: "⚡" },
  { key: "thoughts", label: "Düşünceler", icon: "💭" },
  { key: "emojiEmotion", label: "Duygu", icon: "❤️" },
  { key: "assistantRole", label: "Yapay Zeka Asistan", icon: "🤖" },
  { key: "painPoints", label: "Sorun Noktaları", icon: "⚠️" },
  { key: "touchpoints", label: "Temas Noktaları", icon: "🖥️" },
];

const stressCurve  = [50, 40, 55, 48, 65, 30, 35, 20, 15];
const qualityCurve = [60, 65, 72, 76, 58, 80, 75, 85, 92];

function CurveChart({ data, color, label, subtitle }) {
  const max = 100;
  const width = 560;
  const height = 80;
  const pad = 20;
  const n = data.length;
  const stepX = (width - pad * 2) / (n - 1);

  const points = data.map((v, i) => ({
    x: pad + i * stepX,
    y: pad + ((max - v) / max) * (height - pad * 2),
    v,
  }));

  const pathD = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + p.x) / 2;
    return `C ${cpX} ${prev.y}, ${cpX} ${p.y}, ${p.x} ${p.y}`;
  }).join(" ");

  const areaD = pathD + ` L ${points[n - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div style={{ flex: 1, minWidth: 260 }}>
      <div style={{ fontSize: 12, color: "#8B949E", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 11, color: "#6B7A8D", marginBottom: 10 }}>{subtitle}</div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: 90, overflow: "visible" }}>
        <defs>
          <linearGradient id={`grad-${label.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${label.replace(/\s/g, "")})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill={color} />
            <text x={p.x} y={p.y - 10} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{p.v}%</text>
          </g>
        ))}
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, marginTop: 4 }}>
        {stages.map((s) => (
          <div key={s.id} style={{ fontSize: 8, color: "#6B7A8D", textAlign: "center", lineHeight: 1.3 }}>{s.label}</div>
        ))}
      </div>
    </div>
  );
}

export default function UserJourneyMap() {
  const [activeStage, setActiveStage] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const isHighlighted = (stageId, rowKey) => {
    if (activeStage && activeRow) return stageId === activeStage && rowKey === activeRow;
    if (activeStage) return stageId === activeStage;
    if (activeRow) return rowKey === activeRow;
    return false;
  };

  const isDimmed = (stageId, rowKey) => {
    if (!activeStage && !activeRow) return false;
    if (activeStage && activeRow) return !(stageId === activeStage && rowKey === activeRow);
    if (activeStage) return stageId !== activeStage;
    if (activeRow) return rowKey !== activeRow;
    return false;
  };

  const cols = `120px repeat(${stages.length}, 1fr)`;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D1117",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#E8EDF3",
      padding: "32px 24px",
      overflowX: "auto",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ background: "linear-gradient(135deg, #4FC3F7, #CE93D8)", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎯</div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#6B7A8D", textTransform: "uppercase", marginBottom: 2 }}>UX Kullanıcı Yolculuğu</div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, background: "linear-gradient(90deg, #4FC3F7, #CE93D8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Çağrı Merkezi Yapay Zeka Asistanı
            </h1>
          </div>
        </div>
        <p style={{ margin: 0, color: "#6B7A8D", fontSize: 13 }}>Temsilci deneyimi · Gerçek zamanlı yapay zeka ko-pilot · Ekip uyum haritası</p>
      </div>

      {/* Persona bar */}
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 10, padding: "12px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #4FC3F7 0%, #81C784 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Ayşe, Çağrı Merkezi Temsilcisi</div>
            <div style={{ fontSize: 11, color: "#6B7A8D" }}>2 yıl deneyim · Günde 40–60 çağrı</div>
          </div>
        </div>
        <div style={{ width: 1, height: 36, background: "#21262D" }} />
        <div style={{ fontSize: 12, color: "#6B7A8D" }}>
          <span style={{ color: "#4FC3F7", fontWeight: 600 }}>Senaryo: </span>
          Yapay zeka desteğiyle faturalandırma şikayeti olan müşteriyle canlı görüşme
        </div>
        <div style={{ marginLeft: "auto" }}>
          {activeStage || activeRow ? (
            <button onClick={() => { setActiveStage(null); setActiveRow(null); }} style={{ background: "#21262D", border: "1px solid #30363D", color: "#E8EDF3", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer" }}>Filtreyi Temizle</button>
          ) : (
            <div style={{ fontSize: 11, color: "#6B7A8D" }}>Odaklanmak için aşama veya satıra tıklayın</div>
          )}
        </div>
      </div>

      {/* Stage headers */}
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 6, marginBottom: 4 }}>
        <div />
        {stages.map((s) => (
          <div key={s.id} onClick={() => setActiveStage(activeStage === s.id ? null : s.id)} style={{
            background: activeStage === s.id ? s.color + "22" : "#161B22",
            border: `2px solid ${activeStage === s.id ? s.color : "#21262D"}`,
            borderRadius: 10, padding: "12px 6px", textAlign: "center",
            cursor: "pointer", transition: "all 0.2s",
            opacity: activeStage && activeStage !== s.id ? 0.4 : 1,
          }}>
            <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 9, letterSpacing: 0.5, color: s.color, textTransform: "uppercase", fontWeight: 700, marginBottom: 2 }}>Aşama {s.id}</div>
            <div style={{ fontSize: 10, fontWeight: 600, lineHeight: 1.3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Journey rows */}
      {rowLabels.map((row) => (
        <div key={row.key} style={{ display: "grid", gridTemplateColumns: cols, gap: 6, marginBottom: 6 }}>
          <div onClick={() => setActiveRow(activeRow === row.key ? null : row.key)} style={{
            background: activeRow === row.key ? "#21262D" : "transparent",
            border: `1px solid ${activeRow === row.key ? "#30363D" : "transparent"}`,
            borderRadius: 8, padding: "10px 8px",
            display: "flex", alignItems: "center", gap: 6,
            cursor: "pointer", transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 13 }}>{row.icon}</span>
            <span style={{ fontSize: 10, color: "#8B949E", fontWeight: 600 }}>{row.label}</span>
          </div>
          {stages.map((s) => {
            const value = s[row.key];
            const highlight = isHighlighted(s.id, row.key);
            const dimmed = isDimmed(s.id, row.key);
            return (
              <div key={s.id} style={{
                background: highlight ? s.color + "18" : "#161B22",
                border: `1px solid ${highlight ? s.color + "55" : "#21262D"}`,
                borderRadius: 8, padding: 8,
                transition: "all 0.2s",
                opacity: dimmed ? 0.2 : 1,
                minHeight: row.key === "emojiEmotion" ? "auto" : 72,
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                {row.key === "emojiEmotion" ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20 }}>{value}</div>
                    <div style={{ fontSize: 8, color: "#6B7A8D", marginTop: 3 }}>{s.emotions.join(" · ")}</div>
                  </div>
                ) : Array.isArray(value) ? (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {value.map((item, i) => (
                      <li key={i} style={{ fontSize: 9, color: row.key === "painPoints" ? "#F97583" : "#C9D1D9", marginBottom: 3, paddingLeft: 9, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 3, borderRadius: "50%", background: row.key === "painPoints" ? "#F97583" : s.color, display: "block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ margin: 0, fontSize: 9, color: row.key === "assistantRole" ? "#CE93D8" : "#C9D1D9", lineHeight: 1.5, fontStyle: row.key === "assistantRole" ? "italic" : "normal" }}>{value}</p>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Dual curves */}
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 10, padding: "20px 24px", marginTop: 14, display: "flex", gap: 40, flexWrap: "wrap" }}>
        <CurveChart data={stressCurve} color="#F97583" label="Temsilci Stres Eğrisi" subtitle="Yüksek = daha fazla stres / belirsizlik" />
        <div style={{ width: 1, background: "#21262D", flexShrink: 0 }} />
        <CurveChart data={qualityCurve} color="#4DB6AC" label="Çağrı Kalite Eğrisi" subtitle="Yüksek = daha iyi çağrı kalite puanı" />
      </div>

      {/* Opportunities */}
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {[
          { icon: "🚀", title: "Fırsat 1", desc: "Çağrı bağlanmadan önce arayan bağlamını otomatik yükleyerek temsilcinin hazırlık stresini azaltın." },
          { icon: "🏷️", title: "Fırsat 2", desc: "Gerçek zamanlı isim kullanım koçluğu, temsilcinin kendi kendini izlemesine gerek kalmadan doğal bağ kurmasını sağlar." },
          { icon: "✍️", title: "Fırsat 3", desc: "Sessiz metin kanalı, temsilcilerin müşteriyi beklemeye almadan gizlice yanıt almasını mümkün kılar." },
        ].map((o, i) => (
          <div key={i} style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{o.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#4FC3F7", marginBottom: 6 }}>{o.title}</div>
            <div style={{ fontSize: 12, color: "#8B949E", lineHeight: 1.5 }}>{o.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

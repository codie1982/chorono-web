# Chorono spline dokümantasyonu için anahtar kelime analizi

24 Kasım 2026 · Google, ABD İngilizce ve Türkiye Türkçe

Chorono'nun 2D rehberlerinde `spline curve` ve `2d spline` nokta ve eğri düzenlemeyi, `compound path` delikli şekil üretmeyi, `offset path` ise mevcut konturu modellemeyi karşılıyor. ABD'de `spline modeling` için tahmini aylık hacim 170. Sonuçlar ağırlıklı olarak 3D modelleme eğitimi ve araçlarına yöneldiği için rehber başlığı **2D spline modeling** ifadesini yapılan işlemlerle birlikte kullanıyor.

## Sorgu ve sayfa eşlemesi

| Rehber | ABD/EN sorguları ve tahmini aylık hacim | Karşılanan ihtiyaç |
| --- | --- | --- |
| [Bézier points and spline curves](../en/editor-canvas-splines.md) | `spline curve` 260 · `2d spline` 110 · `bezier spline curve` 90 · `bezier handles` 70 · `spline drawing` 30 · `spline geometry` 20 | Spline eğrisini çizmek, anchor ve Bézier kollarını düzenlemek, Point/Edge/Object seviyesini seçmek |
| [Compound paths and Boolean operations](../en/editor-canvas-compound-splines.md) | `compound path` 90 · `compound paths` 90 · `vector boolean operations` bilinmiyor | Bir bileşik yolda delik açmak, örtüşen alanları birleştirmek veya çıkarmak, şekli spline veya 2D Mesh'e dönüştürmek |
| [2D spline modeling](../en/editor-canvas-spline-modeling.md) | `offset path` 110 · `outline stroke` 70 · `convert stroke to path` 10 · `convert stroke to outline` 10 · `spline modeling` 170 | Vektör yolu ofsetlemek, köşe yuvarlamak, çizgiyi dolgulu banda dönüştürmek, modifier sırasını yönetmek |
| [Spline scripting](../en/scripting-splines.md) | Bu sorgu grubunda birincil SEO hedefi yok | Script Console Help hedefi, yerel kontur ve nokta düzenleme örneği |

**İkincil terimler.** `bezier curve` 8.100 ve `vector path` 1.900 aylık ABD/EN tahmini gösteriyor. Bu geniş sorgular genel tanım için kullanıldı. Eğri rehberi doğrudan Chorono içinde çizme ve düzenleme adımlarını yanıtlıyor. `bezier curve tool` 90 ve `bezier curve editor` 30, ürünün araç kullanımını anlatan metni destekliyor.

**Arama niyeti.** `spline geometry` örneğinde eğri/yüzey dersleri ve CAD odaklı sonuçlar, `spline modeling` örneğinde 3D spline ve 3ds Max eğitimleri görüldü. `2d spline` örneğinde matematik ve programlama içeriği de vardı. `compound path` örneği bileşik yol ve vektör tasarım rehberleriyle, `offset path` örneği vektör konturu ofsetleme eğitimleriyle örtüşüyor. `stroke to path` örneğinde çizgiyi doldurulabilir vektör geometrisine dönüştürme rehberleri görüldü. `convert stroke to path` örneği genel dönüşüm sonuçlarına da açılıyor. Hacimler, görev dilini seçmek için kullanıldı.

## Türkiye Türkçe

| Sorgu | Tahmini aylık hacim | Kullanım |
| --- | ---: | --- |
| spline | 1.900 | Marka, matematik, dişli ve CAD gibi niyetler karışıyor |
| vektörel çizim | 2.900 | Geniş keşif terimi. Türkçe rehber görevi vektör yolunu düzenlemek olarak tanımlar. |
| vektör çizim | 480 | Rehberin genel bağlamı |
| spline ne demek | 140 | Açılışta kısa görev odaklı tanım |
| spline nedir | 50 | Açılışta kısa görev odaklı tanım |
| köşe yuvarlama | 50 | Fillet ve Round Corners açıklaması |
| spline geometri / spline geometrisi | Bilinmiyor | Başlıkta 2D ve Bézier bağlamı. Örnek sonuçlarda CAD, T-Spline ve matematik vardı. |
| spline modelleme | Bilinmiyor | Başlıkta 2D ve araç adları. Örnek sonuçlarda 3D modelleme ve 3ds Max vardı. |
| spline eğrisi / bezier eğrisi | Bilinmiyor | Türkçe rehberde kullanıcıya terimi açıklamak için kullanıldı |

Türkçe kullanıcı adımları editör deposundaki `docs/tr/spline-kullanim-rehberi.md` dosyasında yer alıyor. Web rehberleri mevcut İngilizce dokümantasyon yapısını kullanıyor. Help bağlantıları Point/Edge/Object seçimi, Boolean, Offset/Fillet, modifier stack, Live Outline ve Fill/Stroke için ilgili başlığı açıyor.

## Yöntem ve veri sınırları

- [OpenSEO Keyword Research](https://openseo.so/docs/skills/keyword-research) ve [Keyword Clustering](https://openseo.so/docs/skills/keyword-clustering) iş akışları kullanıldı. Önceki Chorono araştırması mevcut sayfa yapısı ve `spline editor` teriminin karma niyeti için okundu. Bu çalışma yeni spline görevlerini kapsıyor.
- Ölçümler doğrudan DataForSEO Labs [Keyword Overview](https://docs.dataforseo.com/v3/dataforseo_labs/google/keyword_overview/live/), [Keyword Suggestions](https://docs.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live/) ve [Keyword Ideas](https://docs.dataforseo.com/v3/dataforseo_labs/google/keyword_ideas/live/) uçlarından alındı. ABD `2840/en`, Türkiye `2792/tr` kullanıldı. Yakın varyantların hacimleri toplanmadı. Veri dönmeyen terimlerin hacmi bilinmiyor.
- Arama niyeti [Google Organic Live SERP](https://docs.dataforseo.com/v3/serp/google/organic/live/regular/) masaüstü örneklerindeki başlıklardan okundu. Dönüş bağlantıları opak Google yönlendirmeleri olarak geldi. Chorono'nun sırası, gösterimleri ve trafiği ölçülmedi. Ürün adımları yol haritası, mevcut panel bileşenleri ve teknik belgelerden doğrulandı.

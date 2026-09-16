# Av. Vedat Karaman — site ve yönetim paneli

Next.js 16 / React 19, Neon PostgreSQL ve Neon Auth, Neon S3 medya depolama.

## Yönetici kullanımı

- `/admin`: yalnızca yapılandırılmış yönetici kimliğine açık panel.
- İlk giriş veya unutulan parola: `/admin/giris` → **Parolamı unuttum / İlk giriş**. Parola bağlantısı avvedatkaraman@gmail.com hesabına gider.
- Makaleler / Özel Sayfalar: başlık, açıklama, kapak, SEO alanları ve paragraf/başlık/görsel/video/bağlantı blokları. Taslaklar halka açık değildir.
- Değişiklikleri Yayımla: içerik veritabanına kaydedilir; yeniden deploy gerekmez. Eşzamanlı düzenleme revision kontrolüyle korunur.
- Medya Kütüphanesi: yalnızca herkese açık web sitesi görselleri/videoları. Özel dosya veya müvekkil evrakı yüklemeyin. Maksimum 100 MB, JPG/PNG/WebP/MP4/WebM.
- Menüler: özel sayfalara `/sayfa/slug` adresiyle bağlantı ekleyin.
- Mesajlar & Aboneler: iletişim formlarını okuyun, cevap yazın. Gmail gönderimi için hesabın uygulama parolasını panelde kaydedin. Normal Gmail parolasını kullanmayın.
- Abonelik çift onaylıdır. Makale kaydedildikten sonra **Onaylı abonelere bildir** seçilir. Her makale/abonelik için tek bildirim kuyruğa alınır. Ayrılma eski e-postalarda da geçerlidir; bekleyen bildirimler iptal edilir.
- E-posta servisi yapılandırılmadıysa site abonelik gönderimini etkinmiş gibi göstermez. Neon Auth parola sıfırlama servisi bundan ayrıdır; sağlayıcının gönderim limitleri geçerlidir.
- Raporlar: son24saat/30gün/1yıl, sayfa ve yaklaşık tekil tarayıcı, aktif süre, ülke/bölge, yalnızca yöneticide IP ve CSV. Ölçüm ziyaretçinin kabulüne bağlıdır; reddedenler ve engelleyiciler rapora dahil değildir. Kesin kişi sayısı veya Google sıralaması ölçülmez.

## Kurulum

Node >=20.9. `npm ci`, `.env.example` alanlarından `.env.local` oluşturun. Sırlar Git'e eklenmez.
`migrations/001-cms.sql` ve `002-mail-consent.sql` sırasıyla uygulanır. Başlangıç içerikleri `lib/defaults.js` içinde; ilk yönetici kaydında veritabanına alınır.
`npm run dev` yerel geliştirmeyi başlatır. `npm test` güvenlik regresyonlarını; `npm run build` üretim derlemesini kontrol eder.
Production hedefi Vercel'dir. Diğer sağlayıcılarda güvenilir istemci IP katmanı ve zamanlayıcı ayrıca uygulanmadan public API çalıştırılmaz.

## Güvenlik ve veri yönetimi

Yönetici erişimi yalnızca ADMIN_USER_ID eşleşmesiyle verilir; herhangi bir Neon hesabı yönetici olmaz. Sunucu tarafı yetki ve Origin kontrolleri, sınırlandırılmış akış okuma, parametreli sorgular, güvenli React çıktısı, nonce CSP, MIME/boyut kısıtlı imzalı yükleme, rastgele/kimliğe bağlı abonelik kabiliyetleri kullanılır. SMTP parolası ve IP AES-256-GCM ile şifrelenir.
Vercel cron günlük02:00UTC'de temizlik ve10 e-posta gönderimi yapar. IP erişim süresi29gündür; günlük fiziksel temizlik payıyla hedef en fazla30gündür. Zamanlayıcı hataları izlenmelidir. Anonimleştirilmiş ziyaretler en fazla2yıl tutulur. Vercel/Neon platform günlükleri ve yedekleri kendi saklama politikalarına tabidir.
Gönderilen e-posta gövdesi kuyruktan temizlenir. Gönderim hataları panelde görünür. Daha büyük bültenler için kuyruk düğmesiyle partiler gönderilebilir; Gmail hesap limitleri uygulanır.
Neon Auth servis kontrolleri ve e-posta teslimatı ayrıca doğrulanmalıdır. Güvenlik incelemesi ve testler mutlak açık bulunmama garantisi değildir.

## Yayın

GitHub main → Vercel avvedatkaraman / mbakir86s-projects. Ortam sırları Production'a eklenir. Kök alan adı www adresine yönlenir. DNS hedefleri Vercel panelinden doğrulanır. Cloudflare DNS-only ise TLS Vercel tarafından sonlandırılır.
SEO: sayfaya özel canonical, metadata, LegalService/Article JSON-LD, dinamik sitemap, robots, WebP ve mobil tasarım. SEO kontrolü içerik hazırlığını değerlendirir; sıralama garantisi vermez.

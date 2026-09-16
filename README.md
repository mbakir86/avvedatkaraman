# avvedatkaraman.com — Next.js 16 production projesi

Mobirise kaynak paketindeki logo, fotoğraflar, çalışma alanları ve makaleler temel alınarak yeniden geliştirilmiş modern hukuk bürosu web sitesi.

## Teknoloji
- Next.js 16.3.3 (App Router)
- React 19
- Node.js 20+
- Vercel uyumlu
- Cloudflare DNS/HTTPS ile kullanılabilir

## Yerel çalışma
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm start
```

## Vercel
1. Projeyi GitHub'a gönderin.
2. Vercel > Add New > Project ile repo'yu seçin.
3. Framework: Next.js otomatik algılanır.
4. Deploy.
5. Settings > Domains altında `avvedatkaraman.com` ve `www.avvedatkaraman.com` ekleyin.

## Cloudflare Free DNS
Cloudflare'da domain'i ekleyin ve registrar nameserver'larını Cloudflare'ın verdiği iki nameserver ile değiştirin. Vercel Domain ekranında gösterilen A/CNAME kayıtlarını Cloudflare DNS'e girin. İlk doğrulama sırasında Vercel'in gösterdiği değerleri esas alın.

HTTPS Vercel tarafından otomatik sertifika ile sağlanır; Cloudflare kullanılıyorsa SSL/TLS modu için `Full (strict)` tercih edilir.

## İletişim formu
Sunucuya veri kaydetmez. Form, ziyaretçinin varsayılan e-posta uygulamasında `iletisim@avvedatkaraman.com` adresine hazır e-posta oluşturur. Böylece ücretsiz planda ek backend servisi gerektirmez.

## SEO
- Metadata / Open Graph
- `sitemap.xml`
- `robots.txt`
- LegalService JSON-LD
- Semantik başlık yapısı
- WebP görseller
- Canonical URL'ler

## İçerik notu
Hukuki makaleler kaynak sitedeki içerik temel alınarak okunabilirlik ve güncellik uyarılarıyla düzenlenmiştir. Yayın öncesi avukat tarafından hukuki/metinsel son kontrol önerilir.

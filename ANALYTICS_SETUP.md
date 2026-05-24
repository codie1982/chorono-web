# Google Analytics Setup

Bu proje Google Analytics entegrasyonu ile birlikte gelir.

## Kurulum Adımları

### 1. Google Analytics ID'nizi Alın

1. [Google Analytics](https://analytics.google.com/) sayfasına gidin
2. Hesabınızı oluşturun veya mevcut hesaba giriş yapın
3. Yeni bir "Web" property oluşturun
4. Ölçüm ID'sini kopyalayın (format: `G-XXXXXXXXXX`)

### 2. Environment Variable'ı Ayarlayın

`.env.local` dosyasını açın ve Google Analytics ID'nizi ekleyin:

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

> ⚠️ **Önemli**: `NEXT_PUBLIC_` prefix'i kullanın, aksi takdirde Analytics'e erişilemez.

### 3. Doğrulayın

Dev server'ı başlatın:

```bash
npm run dev
```

Ardından:
1. Browser DevTools'u açın (F12)
2. Console'a gidin
3. `window.gtag` komutunu çalıştırıp fonksiyonun var olup olmadığını kontrol edin

Google Analytics Dashboard'unda gerçek-time verileri görebilirsiniz.

## Tracking Events

Kodda `lib/analytics.ts` dosyasında önceden tanımlanmış event'ler var:

```typescript
import { trackButtonClick, trackCodeCopy } from '@/lib/analytics'

// Buton tıklamasını track et
trackButtonClick('my_button')

// Kod kopyalamayı track et
trackCodeCopy('npm_install')
```

## Otomatik Tracked Events

Aşağıdaki etkileşimler otomatik olarak izlenir:

- 📋 **Code Copy**: Kod blokları kopyalandığında
- 🔗 **Button Clicks**: CTA butonlarına tıklandığında
- 🔴 **Page Views**: Her sayfa ziyaretinde

## Dashboard'da Görüntüleyin

1. [Google Analytics Dashboard](https://analytics.google.com/) açın
2. "Real-time" → "Overview" seçin
3. Canlı ziyaretçileri ve etkileşimleri görün

## Ortamlar

- **Development**: Local testing (test data gönderir)
- **Production**: Live tracking (gerçek kullanıcı verileri)

## Daha Fazla Bilgi

- [Next.js Google Analytics Docs](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics)
- [Google Analytics Docs](https://support.google.com/analytics/answer/1008015)

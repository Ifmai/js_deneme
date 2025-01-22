# Proje Açıklaması

Bu proje kapsamında ürün listeleme özelliği geliştirildi. Aşağıda proje ile ilgili bazı detaylar yer almaktadır.

## Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- jQuery

## Yapılan Değişiklikler

### 1. jQuery Import Sorunu

CSP (Content Security Policy) nedeniyle `Google Console` üzerinden doğrudan jQuery import edilemedi. Bu sorunu aşmak için `index.html` dosyasına jQuery'yi import ederek projede kullanıma sundum.

### 2. Ürün Fotoğraflarının Local Olarak Eklenmesi

Ürün fotoğrafları, GitHub reposunda yer alan bağlantıların bir ürün sayfasına yönlendirme yapması nedeniyle local olarak depolandı ve kullanıldı. Geri kalan tüm ürün bilgileri (`name`, `price`, `id`, `description` vb.) ise GitHub reposunda gönderilen isteğe yanıt olarak dönen verilerden alındı.

### 3. "Ürün Detay" Bağlantısı

GitHub reposundan çekilen JSON verisinde `"url"` alanı, ürünlerin **"Ürün Detay"** bağlantısı için kullanıldı.

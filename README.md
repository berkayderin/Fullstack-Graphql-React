# GraphQL Kullanılarak Geliştirilen Kitap Yönetim Sistemi

Bu proje, GraphQL, Apollo Server, MongoDB, React ve Apollo Client kullanılarak geliştirilmiş bir kitap yönetim sistemidir. Sistem, kullanıcıların kitap eklemelerine, güncellemelerine, silmelerine ve kitapları listelemelerine olanak tanır. Aynı zamanda kullanıcı kaydı ve girişi işlevselliğini de barındırır.

## Başlarken

Proje iki ana klasörden oluşur: `server` ve `client`. Her iki klasör de kendi bağımlılıklarına sahiptir ve bağımsız olarak kurulup çalıştırılmalıdır.

### Server Kurulumu

#### Adımlar

1. `server` klasörüne gidin:
    ```bash
    cd server
    ```
2. Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
3. `index.ts` dosyasında `MONGO_URL` değişkenine MongoDB bağlantı URL'nizi ekleyin.
4. Server'ı başlatın:
    ```bash
    npm start
    ```

### Client Kurulumu

#### Adımlar

1. `client` klasörüne gidin:
    ```bash
    cd client
    ```
2. Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
3. Uygulamayı başlatın:
    ```bash
    npm run dev
    ```

## Kullanılan Teknolojiler

### Server

- **@apollo/server**: GraphQL sunucusu oluşturmak için kullanılır.
- **bcrypt**: Kullanıcı şifrelerini hashlemek için kullanılır.
- **graphql**: GraphQL sorguları için dil tanımı.
- **mongoose**: MongoDB için object modeling tool.

### Client

- **@apollo/client**: Apollo Client, GraphQL API'leri ile etkileşim kurmak için kullanılır.
- **@nextui-org/react**: Modern ve duyarlı UI bileşenleri.
- **framer-motion**: Animasyonlar için.
- **react**, **react-dom**: React kütüphaneleri.
- **react-hook-form**: Form işlemleri için.
- **react-router-dom**: SPA(Single Page Application) için yönlendirme.

## Özellikler

- Kullanıcılar kitap ekleyebilir, güncelleyebilir, silebilir ve listeyebilir.
- Kullanıcı kaydı ve giriş işlevselliği.
- Korunan sayfalara erişim kontrolü.
- Kitap arama ve filtreleme.

## Yapı

- `server`:
  - GraphQL API'si sunar.
  - MongoDB'ye bağlanır ve veri işlemlerini yönetir.
- `client`:
  - Kullanıcı arayüzünü sağlar.
  - Apollo Client aracılığıyla server ile iletişime geçer.

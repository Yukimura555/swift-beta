import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import rotw1Background from '../assets/rotw1-base64'; 

const features = [
  {
    title: "Yeni arkadaşlar edin, insanlarla tanış!",
    description: "Sürekli büyüyen ve sıcakkanlı muhteşem insanlarla dolu topluluğumuzun değerli bir parçası ol!",
    image: "/swift-beta/assets/arkadas.png",
    alt: "Arkadaşlık görseli"
  },
  {
    title: "Yüzlerce yeni kıyafetle kendi tarzını oluştur!",
    description: "Karakterini dilediğin gibi giydir, tarzınla ve zevklerinle gözleri kamaştır, fark edil!",
    image: "/swift-beta/assets/kiyafet.png",
    alt: "Kıyafet görseli"
  },
  {
    title: "Etkinlik ve yarışmalara katıl!",
    description: "Swift'in yenilikçi organizasyonlarına ve oyunlarımıza katılarak ödüller kazan!",
    image: "/swift-beta/assets/oduller.png",
    alt: "Ödüller görseli"
  },
  {
    title: "Detaylı bir takas sistemi!",
    description: "Özenle planladığımız ekonomimizde dilediğin gibi takas yap! En zengin sen ol!",
    image: "/swift-beta/assets/takas.png",
    alt: "Takas görseli"
  },
  {
    title: "Gruplara ve aktivitelere katıl!",
    description: "Kendini ait hissettiğin ortamlara dahil ol! Çeşitli gruplara ve topluluklara katılarak yeni yüzler tanı!",
    image: "/swift-beta/assets/grup.png",
    alt: "Grup görseli"
  },
  {
    title: "Sıkılmak burada yasak!",
    description: "Oyundaki tonla etkinliği ve mini oyunları keşfet! Seni bekleyen o kadar çok şey var ki!",
    image: "/swift-beta/assets/yarisma.png",
    alt: "Yarışma görseli"
  }
];

const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

const FeaturePanel = ({ feature, index, scrollY }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      className={`feature-panel ${!isEven ? 'right' : ''}`}
      initial={{ 
        opacity: 0,
        x: isEven ? -50 : 50,
        y: 100
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: index * 0.1
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{
        boxShadow: "0 0 0 1px rgba(127, 254, 229, 0.3)",
      }}
    >
      <div className="feature-content">
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
      <div className="feature-image">
        <Image
          src={feature.image}
          alt={feature.alt}
          width={300}
          height={300}
        />
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [inviteCode, setInviteCode] = useState('');
  const [showInputError, setShowInputError] = useState(false);
  const [showInvalidCode, setShowInvalidCode] = useState(false);
  const [shake, setShake] = useState(false);
  const scrollY = useScrollAnimation();

  const handleCodeChange = (e) => {
    let value = e.target.value.toUpperCase();
    setShowInputError(false);
    setShowInvalidCode(false);
    setShake(false);
    value = value.replace(/[^A-Z0-9]/g, '');
    if (value.length >= 3) {
      value = value.slice(0, 3) + '-' + value.slice(3, 6);
    }
    if (value.length <= 6 || (value.length === 7 && value.includes('-'))) {
      setInviteCode(value);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inviteCode.length !== 7 || !inviteCode.includes('-') || inviteCode.indexOf('-') !== 3) {
      setShowInputError(true);
      triggerShake();
      setTimeout(() => setShowInputError(false), 3000);
      return;
    }
    setShowInvalidCode(true);
    triggerShake();
    setTimeout(() => setShowInvalidCode(false), 5000);
  };

  useEffect(() => {
    const preventRightClick = (e) => {
      e.preventDefault();
      return false;
    };

    const preventDevTools = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', preventRightClick);
    document.addEventListener('keydown', preventDevTools);

    return () => {
      document.removeEventListener('contextmenu', preventRightClick);
      document.removeEventListener('keydown', preventDevTools);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Swift Hotel - Kapalı Beta</title>
        <meta name="description" content="Swift Hotel kapalı beta" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/swift-beta/assets/favicon.ico" />
      </Head>

      <div className="maintenance-page">
        <div className="hero-section">
          <Image
            src={rotw1Background}
            alt="background"
            className="hero-background"
            fill
            priority
          />
          <div className="hero-content">
            <h1>Swift Hotel şu anda kapalı betada.</h1>
            <div className="invite-section">
              <h2>Kapalı beta davetiye kodunuzu yazın.</h2>
              <form onSubmit={handleSubmit}>
                <div className={`input-container ${shake ? 'shake' : ''}`}>
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={handleCodeChange}
                    placeholder="XXX-XXX"
                    className={showInputError ? 'error' : ''}
                  />
                  <AnimatePresence>
                    {showInputError && (
                      <motion.div
                        className="input-error-message"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Davet kodu 6 haneli olmalıdır
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>
          <AnimatePresence>
            {showInvalidCode && (
              <motion.div
                className="error-popup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                Davet kodunuz yanlış. Bu sorunun devam etmesi durumunda hotel personeli ile iletişime geçin.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          className="features-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {features.map((feature, index) => (
            <FeaturePanel
              key={index}
              feature={feature}
              index={index}
              scrollY={scrollY}
            />
          ))}
        </motion.div>

        <footer className="footer">
          <div className="footer-logo">
            <Image src="/swift-beta/assets/swiftlogo.png" alt="Swift Hotel Logo" width={150} height={150} />
          </div>
          <div className="copyright">
            <div className="copyright-year">© 2025 Swift</div>
            <div className="copyright-text">Swift Hotel akademik bir projedir. Tüm satın alımlar bağış olarak kabul edilir ve sunucumuza fon sağlar.</div>
          </div>
          <div className="social-links">
            <a href="https://tiktok.com/swift.hoteltr" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://instagram.com/swift.hoteltr" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </footer>
      </div>
    </>
  );
}

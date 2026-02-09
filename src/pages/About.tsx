export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">À Propos</h1>
          <p className="text-xl">Découvrez l'histoire du Grand Hotel</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <img
              src="https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg"
              alt="Grand Hotel"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Fondé en 1920, le Grand Hotel est devenu au fil des années une référence
              en matière d'hospitalité de luxe. Notre établissement combine élégance
              classique et confort moderne pour offrir à nos clients une expérience
              inoubliable.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Situé au cœur de la ville, notre hôtel 5 étoiles offre un accès privilégié
              aux principales attractions tout en garantissant calme et tranquillité dans
              un cadre raffiné.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Notre équipe dévouée met tout en œuvre pour assurer votre confort et
              satisfaction, avec un service personnalisé disponible 24h/24.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Nous visons l'excellence dans chaque détail de votre séjour
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hospitalité</h3>
              <p className="text-gray-600">
                Un accueil chaleureux et un service attentionné
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Durabilité</h3>
              <p className="text-gray-600">
                Engagement envers l'environnement et le développement durable
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Distinctions & Récompenses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🏆</span>
              <div>
                <h4 className="font-bold text-gray-900">Prix du Meilleur Hôtel 2023</h4>
                <p className="text-gray-600">Décerné par le Guide des Hôtels</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⭐</span>
              <div>
                <h4 className="font-bold text-gray-900">5 Étoiles</h4>
                <p className="text-gray-600">Classification officielle</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🌟</span>
              <div>
                <h4 className="font-bold text-gray-900">TripAdvisor Excellence</h4>
                <p className="text-gray-600">Certificat d'Excellence 2023</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🍴</span>
              <div>
                <h4 className="font-bold text-gray-900">Restaurant Étoilé</h4>
                <p className="text-gray-600">1 étoile au Guide Michelin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
  en: {
    translation: {
      profile: "Profile",
      home: "Home",
      tickets: "Tickets",
      track: "Track",
      edit_profile: "Edit Profile",
      account_settings: "Account Settings",
      personal_info: "Personal Information",
      payment_methods: "Payment Methods",
      language: "Language",
      notifications: "Notifications",
      dark_mode: "Dark Mode",
      preferences: "Preferences",
      support_legal: "Support & Legal",
      help_center: "Help Center",
      privacy_policy: "Privacy Policy",
      success: "Success",
      profile_updated: "Profile updated successfully",
      logout: "Logout",
      save: "Save",
      remove_photo: "Remove Photo",
      change_photo: "Change Photo",
      full_name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      confirm_logout: "Are you sure you want to log out?",
      cancel: "Cancel",
      version: "Version"
    }
  },
  fr: {
    translation: {
      profile: "Profil",
      home: "Accueil",
      tickets: "Billets",
      track: "Suivi",
      edit_profile: "Modifier le profil",
      account_settings: "Paramètres du compte",
      personal_info: "Informations personnelles",
      payment_methods: "Modes de paiement",
      language: "Langue",
      notifications: "Notifications",
      dark_mode: "Mode sombre",
      preferences: "Préférences",
      support_legal: "Support & Légal",
      help_center: "Centre d'aide",
      privacy_policy: "Politique de confidentialité",
      success: "Succès",
      profile_updated: "Profil mis à jour avec succès",
      logout: "Déconnexion",
      save: "Enregistrer",
      remove_photo: "Supprimer la photo",
      change_photo: "Changer la photo",
      full_name: "Nom complet",
      email: "E-mail",
      phone: "Numéro de téléphone",
      confirm_logout: "Êtes-vous sûr de vouloir vous déconnecter ?",
      cancel: "Annuler",
      version: "Version"
    }
  },
  rw: {
    translation: {
      profile: "Imyirondoro",
      home: "Ahabanza",
      tickets: "Amatike",
      track: "Gukurikirana",
      edit_profile: "Hindura imyirondoro",
      account_settings: "Igenamiterere rya konti",
      personal_info: "Amakuru bwite",
      payment_methods: "Uburyo bwo kwishyura",
      language: "Ururimi",
      notifications: "Imenyesha",
      dark_mode: "Uburyo bwijimye",
      preferences: "Ibyifuzo",
      support_legal: "Ubufasha & Amategeko",
      help_center: "Ahabanza ubufasha",
      privacy_policy: "Amategeko y'ibanga",
      success: "Byagenze neza",
      profile_updated: "Imyirondoro yahinduwe neza",
      logout: "Sohoka",
      save: "Bika",
      remove_photo: "Kuraho ifoto",
      change_photo: "Hindura ifoto",
      full_name: "Amazina yose",
      email: "Imeri",
      phone: "Nimero ya terefone",
      confirm_logout: "Urashaka gusohoka koko?",
      cancel: "Hagarika",
      version: "Verisiyo"
    }
  }
};

const LANGUAGE_KEY = 'user-language';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const language = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (language) {
        return callback(language);
      }
      return callback('en');
    } catch (error) {
      console.log('Error detecting language', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.log('Error caching language', error);
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

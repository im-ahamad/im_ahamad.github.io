import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        education: "Education",
        skills: "Skills",
        certifications: "Certifications",
        interests: "Academic Interests",
        projects: "Projects"
      },
      hero: {
        title: "Abu Naeem Md Ahamad Ullah",
        subtitle: "Aspiring AI Engineer | Software Developer | Bioinformatics Enthusiast",
        description: "Passionate about Artificial Intelligence, Bioinformatics, and Software Development. Dedicated to developing intelligent systems that advance personalized healthcare, education, and human well-being.",
        email: "Email Me",
        github: "GitHub",
        linkedin: "LinkedIn",
        wechat: "WeChat",
        whatsapp: "WhatsApp"
      },
      education: {
        title: "Education",
        subtitle: "Academic journey",
        session: "Session"
      },
      skills: {
        title: "Skills",
        subtitle: "Technical expertise",
        programming: "Programming Languages",
        libraries: "Libraries & Frameworks",
        databases: "Databases & Tools",
        soft: "Soft Skills"
      },
      certifications: {
        title: "Certifications",
        subtitle: "Professional training",
        duration: "Duration",
        reference: "Reference"
      },
      interests: {
        title: "Academic Interests",
        subtitle: "Research passions"
      },
      projects: {
        title: "Projects",
        subtitle: "Practical implementations",
        overview: "Overview",
        problem: "Problem Solved",
        implementation: "Implementation",
        impact: "Impact"
      },
      footer: {
        languages: "Languages",
        copyright: "All rights reserved"
      }
    }
  },
  bn: {
    translation: {
      nav: {
        education: "শিক্ষা",
        skills: "দক্ষতা",
        certifications: "সার্টিফিকেট",
        interests: "একাডেমিক আগ্রহ",
        projects: "প্রকল্প"
      },
      hero: {
        title: "আবু নাঈম মোঃ আহামাদ উল্লাহ",
        subtitle: "উদীয়মান AI ইঞ্জিনিয়ার | সফটওয়্যার ডেভেলপার | বায়োইনফরমেটিক্স উৎসাহী",
        description: "কৃত্রিম বুদ্ধিমত্তা, বায়োইনফরমেটিক্স এবং সফটওয়্যার ডেভেলপমেন্ট সম্পর্কে উৎসাহী। ব্যক্তিগত স্বাস্থ্যসেবা, শিক্ষা এবং মানব কল্যাণ অগ্রসর করতে বুদ্ধিমান সিস্টেম তৈরিতে নিবেদিত।",
        email: "ইমেইল করুন",
        github: "গিটহাব",
        linkedin: "লিংকডইন",
        wechat: "ওয়েচ্যাট",
        whatsapp: "হোয়াটসঅ্যাপ"
      },
      education: {
        title: "শিক্ষা",
        subtitle: "একাডেমিক যাত্রা",
        session: "সেশন"
      },
      skills: {
        title: "দক্ষতা",
        subtitle: "প্রযুক্তিগত দক্ষতা",
        programming: "প্রোগ্রামিং ভাষা",
        libraries: "লাইব্রেরি এবং ফ্রেমওয়ার্ক",
        databases: "ডাটাবেস এবং টুলস",
        soft: "সফট স্কিলস"
      },
      certifications: {
        title: "সার্টিফিকেট",
        subtitle: "পেশাদার প্রশিক্ষণ",
        duration: "সময়কাল",
        reference: "রেফারেন্স"
      },
      interests: {
        title: "একাডেমিক আগ্রহ",
        subtitle: "গবেষণার আগ্রহ"
      },
      projects: {
        title: "প্রকল্প",
        subtitle: "ব্যবহারিক বাস্তবায়ন",
        overview: "ওভারভিউ",
        problem: "সমাধান করা সমস্যা",
        implementation: "বাস্তবায়ন",
        impact: "প্রভাব"
      },
      footer: {
        languages: "ভাষা",
        copyright: "সর্বস্বত্ব সংরক্ষিত"
      }
    }
  },
  hi: {
    translation: {
      nav: {
        education: "शिक्षा",
        skills: "कौशल",
        certifications: "प्रमाणपत्र",
        interests: "शैक्षणिक रुचियां",
        projects: "परियोजनाएं"
      },
      hero: {
        title: "अबू नईम मोहम्मद अहमद उल्लाह",
        subtitle: "महत्वाकांक्षी AI इंजीनियर | सॉफ्टवेयर डेवलपर | बायोइन्फॉरमैटिक्स उत्साही",
        description: "कृत्रिम बुद्धिमत्ता, बायोइन्फॉरमैटिक्स और सॉफ्टवेयर विकास के प्रति जुनूनी। व्यक्तिगत स्वास्थ्य देखभाल, शिक्षा और मानव कल्याण को आगे बढ़ाने वाली बुद्धिमान प्रणालियों के विकास के लिए समर्पित।",
        email: "ईमेल करें",
        github: "गिटहब",
        linkedin: "लिंक्डइन",
        wechat: "वीचैट",
        whatsapp: "व्हाट्सएप"
      },
      education: {
        title: "शिक्षा",
        subtitle: "शैक्षणिक यात्रा",
        session: "सत्र"
      },
      skills: {
        title: "कौशल",
        subtitle: "तकनीकी विशेषज्ञता",
        programming: "प्रोग्रामिंग भाषाएं",
        libraries: "लाइब्रेरी और फ्रेमवर्क",
        databases: "डेटाबेस और उपकरण",
        soft: "सॉफ्ट स्किल्स"
      },
      certifications: {
        title: "प्रमाणपत्र",
        subtitle: "पेशेवर प्रशिक्षण",
        duration: "अवधि",
        reference: "संदर्भ"
      },
      interests: {
        title: "शैक्षणिक रुचियां",
        subtitle: "अनुसंधान जुनून"
      },
      projects: {
        title: "परियोजनाएं",
        subtitle: "व्यावहारिक कार्यान्वयन",
        overview: "अवलोकन",
        problem: "समस्या समाधान",
        implementation: "कार्यान्वयन",
        impact: "प्रभाव"
      },
      footer: {
        languages: "भाषाएं",
        copyright: "सर्वाधिकार सुरक्षित"
      }
    }
  },
  zh: {
    translation: {
      nav: {
        education: "教育",
        skills: "技能",
        certifications: "证书",
        interests: "学术兴趣",
        projects: "项目"
      },
      hero: {
        title: "阿布·纳伊姆·穆罕默德·艾哈迈德·乌拉",
        subtitle: "有抱负的人工智能工程师 | 软件开发人员 | 生物信息学爱好者",
        description: "热衷于人工智能、生物信息学和软件开发。致力于开发智能系统，促进个性化医疗保健、教育和人类福祉。",
        email: "发邮件",
        github: "GitHub",
        linkedin: "LinkedIn",
        wechat: "微信",
        whatsapp: "WhatsApp"
      },
      education: {
        title: "教育",
        subtitle: "学术历程",
        session: "学期"
      },
      skills: {
        title: "技能",
        subtitle: "技术专长",
        programming: "编程语言",
        libraries: "库和框架",
        databases: "数据库和工具",
        soft: "软技能"
      },
      certifications: {
        title: "证书",
        subtitle: "专业培训",
        duration: "时长",
        reference: "参考"
      },
      interests: {
        title: "学术兴趣",
        subtitle: "研究热情"
      },
      projects: {
        title: "项目",
        subtitle: "实践实施",
        overview: "概述",
        problem: "解决的问题",
        implementation: "实施",
        impact: "影响"
      },
      footer: {
        languages: "语言",
        copyright: "版权所有"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

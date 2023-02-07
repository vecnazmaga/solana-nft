import Vue from 'vue'
import { Neo } from '@kodadot1/brick'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'

// nuxt will handle css
config.autoAddCss = false

import {
  faAngleLeft,
  faAngleRight,
  faArrowUp,
  faArrowsAlt,
  faBars,
  faBookOpen,
  faBookmark,
  faCalculator,
  faCalendar,
  faCameraRetro,
  faCaretDown,
  faCaretUp,
  faChartLine,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faClock,
  faCloudDownloadAlt,
  faCode,
  faCommentAlt,
  faCompress,
  faCompressAlt,
  faCompressArrowsAlt,
  faCopy,
  faCube,
  faDice,
  faDownload,
  faEllipsisH,
  faEllipsisV,
  faEnvelope,
  faExclamationCircle,
  faExclamationTriangle,
  faExpand,
  faExternalLinkAlt,
  faExternalLinkSquareAlt,
  faEye,
  faEyeSlash,
  faFileImage,
  faFilter,
  faFire,
  faFlask,
  faGhost,
  faGift,
  faGlobe,
  faHeart,
  faHistory,
  faImage,
  faInfo,
  faInfoCircle,
  faKey,
  faLanguage,
  faLeaf,
  faLightbulb,
  faLink,
  faListUl,
  faMagic,
  faMinus,
  faMoneyBill,
  faMoneyBillAlt,
  faPalette,
  faPaperPlane,
  faPlus,
  faPrint,
  faQrcode,
  faQuestion,
  faQuestionCircle,
  faReply,
  faSearch,
  faShare,
  faShareAlt,
  faShareSquare,
  faShop,
  faSignOutAlt,
  faSync,
  faTable,
  faTag,
  faTh,
  faThLarge,
  faTimes,
  faTimesCircle,
  faTrash,
  faUpload,
  faUser,
  faUserCircle,
  faUsers,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'

// throws error, idk why
import {
  faCommentDots,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-regular-svg-icons'

import {
  faDiscord,
  faFacebook,
  faFacebookMessenger,
  faInstagram,
  faLine,
  faMedium,
  faPinterest,
  faRedditAlien,
  faTelegram,
  faTelegramPlane,
  faTwitter,
  faWhatsapp,
  faWpexplorer,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faBars,
  faBookOpen,
  faPaperPlane,
  faFileImage,
  faPlus,
  faSync,
  faTimes,
  faTimesCircle,
  faCopy,
  faTrash,
  faCloudDownloadAlt,
  faKey,
  faExternalLinkAlt,
  faUpload,
  faUsers,
  faEllipsisV,
  faQuestionCircle,
  faMinus,
  faSearch,
  faInfoCircle,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faCaretDown,
  faCaretUp,
  faInfo,
  faShareSquare,
  faShop,
  faBookmark,
  faLink,
  faHeart,
  faLanguage,
  faQuestion,
  faEye,
  faPrint,
  faCommentAlt,
  faMagic,
  faDice,
  faLeaf,
  faFlask,
  faCalendar,
  faEnvelope,
  faClock,
  faCommentDots,
  faGhost,
  faCode,
  faWpexplorer,
  faRedditAlien,
  faCameraRetro,
  faTag,
  faShareAlt,
  faShare,
  faExclamationTriangle,
  faCalculator,
  faArrowsAlt,
  faCompressAlt,
  faCompress,
  faCompressArrowsAlt,
  faTable,
  faEyeSlash,
  faArrowUp,
  faUser,
  faUserCircle,
  faGlobe,
  faExclamationCircle,
  faFilter,
  faQrcode,
  faGift,
  faThLarge,
  faTh,
  faFire,
  faMoneyBill,
  faMoneyBillAlt,
  faPalette,
  faHistory,
  faEllipsisH,
  faLightbulb,
  faCube,
  faExpand,
  faImage,
  faSignOutAlt,
  faWallet,
  faChartLine,
  faListUl,
  faDownload,
  faCheck,

  // Social
  faTwitter,
  faTelegram,
  faFacebook,
  faFacebookMessenger,
  faDiscord,
  faLine,
  faTelegramPlane,
  faWhatsapp,
  faPinterest,
  faMedium,
  faAngleLeft,
  faAngleRight,
  faReply,
  faThumbsUp,
  faUserCircle,
  faThumbsDown,
  faExternalLinkSquareAlt,
  faYoutube,
  faInstagram
)

Vue.component('VueFontawesome', FontAwesomeIcon).use(Neo, {
  iconComponent: 'vue-fontawesome',
  iconPack: 'fas',
  customIconPacks: {
    fas: {
      sizes: {
        default: 'fw',
      },
    },
  },
})

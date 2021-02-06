import Vue from 'vue';

import {
  // faPlay, faFolderOpen, faAddressBook,
  // faCalendarCheck, faCogs,  faEyeSlash,
  // faExclamationCircle,   faAngleDoubleLeft, 
  // faAngleDoubleRight, 
  // faCaretUp, faFile, faBook, 
  // faCodeBranch, 
  // faArrowUp, faTools, faCheck, faSeedling, faDatabase, faGem, 
  // faInfoCircle, faExchangeAlt, faBug, faStop, faEllipsisV, faPercent,
  // faUsersCog, faCoins, faAngleLeft, faAngleRight,
  // faCreditCard, faStepForward, faRing, faDonate, 
  // faPenNib, faImages,

  faPaperPlane, faFileImage, faPlus, faSync, faEye,
  faTimes, faCopy, faTrash, faCloudDownloadAlt,
  faKey, faExternalLinkAlt, faUpload, faUsers,
  faQuestionCircle, faMinus,
  faChevronDown, faChevronUp,
  faHeart, faSearch, faCaretDown
} from '@fortawesome/free-solid-svg-icons';

// throws error, idk why
// import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { faTwitter, faLine, faTelegram } from '@fortawesome/free-brands-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
  // faTrash, faKey, faSync, faRedo,
  // faCloudDownloadAlt, faPlay, faFolderOpen,
  // faUsers, faAddressBook, faPaperPlane,
  // faCalendarCheck, faCogs, faEye, faEyeSlash,
  // faExclamationCircle, faUpload, faCopy, faAngleDoubleLeft,
  // faAngleDoubleRight, faPlus, faTimes, faCaretDown, 
  // faCaretUp, faMinus, faFile, faBook,
  // faCodeBranch, faSearch, faQuestionCircle, faExternalLinkAlt,
  // faTwitter, faArrowUp, faTools, faCheck, faSeedling, 
  // faDatabase, faGem,  faInfoCircle, faExchangeAlt,
  // faBug, faStop, faEllipsisV, faPercent, faUsersCog, faCoins,
  // faAngleLeft, faAngleRight, faCreditCard, faStepForward, faRing,
  // faDonate, faFileImage, faPenNib, faImages, faLine

  faPaperPlane, faFileImage, faPlus, faSync, faEye,
  faTimes, faCopy, faTrash, faCloudDownloadAlt,
  faKey, faExternalLinkAlt, faUpload, faUsers,
  faQuestionCircle, faMinus,
  faChevronDown, faChevronUp,
  faTwitter, faTelegram,
  faLine, faHeart, faSearch,
  faCaretDown
  );

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('vue-fontawesome', FontAwesomeIcon);  

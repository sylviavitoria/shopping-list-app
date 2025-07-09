import '@testing-library/react-native';
import 'react-native-gesture-handler/jestSetup';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  serverTimestamp: jest.fn(() => new Date()),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  MaterialIcons: 'MaterialIcons',
  FontAwesome: 'FontAwesome',
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.Share = {
    share: jest.fn(() => Promise.resolve({ action: 'sharedAction' })),
    dismissedAction: 'dismissedAction',
    sharedAction: 'sharedAction',
  };

  return RN;
});
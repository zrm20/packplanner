import confirmDelete from './confirmDelete/confirmDelete';
import extractId from './extractId/extractId';
import { authErrorExtractor } from './firebaseErrorExtractor/firebaseErrorExtractor';
import isAndroid from './isAndroid/isAndroid';

export { isAndroid, extractId, confirmDelete, authErrorExtractor };

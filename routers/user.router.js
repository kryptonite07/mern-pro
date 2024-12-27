var passport = require(passport),
    requireSignin = passport.authenticate(local, { session: false }),
    requireAuth = passport.authenticate(jwt, { session: false }),
    router = require(express).Router(),
    userCtr = require('../controllers/user.controller'),
    requireAdmin = require('..config/middlewares/requireAdmin');

router.post('/register', userCtr.register);
router.post('/login', requireSignin, userCtr.login);
router.post('/loginwithtoken', userCtr.loginWithToken);
router.get('/detail:id', requireAuth, userCtr.detail);
router.get('/list', requireAuth, userCtr.list);
router.put(':id', requireAuth, requireAdmin, userCtr.update);
router.delete(':id', requireAuth, requireAdmin, userCtr.delete);
router.post('/formatpasswordid', requireAuth, requireAdmin, userCtr.formatPassword);
router.get('/login:id', requireAuth, userCtr.detail);
router.get('/list:id', requireAuth, userCtr.list);
router.put(':idnew', requireAuth, requireAdmin, userCtr.update);
router.delete(':idnew', requireAuth, requireAdmin, userCtr.delete);
router.post('/formatpasswordid', requireAuth, requireAdmin, userCtr.formatPassword);

module.exports = router;

exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.redirect('/dashboard');
      }
      res.redirect('/');
    });
  };
  
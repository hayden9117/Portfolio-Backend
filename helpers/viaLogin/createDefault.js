const createDefaultPage = (props) => {
  const { url, pageName, id } = props;
  let config = {
    links: { num: 0, url: [] },
    avatars: 0,
    background: "white",
    template: "column",
  };

  config.url = url;
  config.pageName = pageName;
  config.id = id;

  //const { url, pageName, id, links, avatars, background, template } = props;
  console.log(req.body);
  knex
    .select("*")
    .from("viaAccount")
    .where({ username: `${req.body.username}` })
    .then((result) => {
      if (result.length === 0) {
        // create the new user
        knex
          .insert({
            username: req.body.username,
            password: req.body.password,
          })
          .into("viaAccount")
          .then(
            knex
              .insert({
                userID: id,
                pageName: pageName,
                url: url,
                numLinks: links.num,
                avatars: avatars,
                background: background,
                template: template,
              })
              .into("viaPages")
              .then(() => {
                links.url.forEach((link) => {
                  knex
                    .insert({
                      userID: id,
                      link: link,
                    })
                    .into("links")
                    .then(
                      res.catch((_err) =>
                        res.send({ message: "error " + _err })
                      )
                    );
                });
              })
              .catch((_err) => res.send({ message: "error " + _err }))
          );
      } else {
        res.send({ message: "User Already Exists" });
      }
    })
    .catch((_err) => res.send({ message: "error " + _err }));
};

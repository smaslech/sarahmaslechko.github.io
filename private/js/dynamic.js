    var contentEl = document.getElementById('content'),
        linkEls = document.getElementsByTagName('a'),
        cats = {
          fluffy: {
            content: 'Fluffy!',
            photo: 'http://placekitten.com/200/200'
          },
          socks: {
            content: 'Socks!',
            photo: 'http://placekitten.com/280/280'
          },
          whiskers: {
            content: 'Whiskers!',
            photo: 'http://placekitten.com/350/350'
          },
          bob: {
            content: 'Just Bob.',
            photo: 'http://placekitten.com/320/270'
          }
        };

    // Switcheroo!
    function updateContent(data) {
      if (data == null)
        return;

      contentEl.textContent = data.content;
    }

    // Load some mock JSON data into the page
    function clickHandler(event) {
      var cat = event.target.getAttribute('href').split('/').pop(),
          data = cats[cat] || null; // In reality this could be an AJAX request

      updateContent(data);

      // Add an item to the history log
      history.pushState(data, event.target.textContent, event.target.href);

      return event.preventDefault();
    }

    // Attach event listeners
    for (var i = 0, l = linkEls.length; i < l; i++) {
      linkEls[i].addEventListener('click', clickHandler, true);
    }

    // Revert to a previously saved state
    window.addEventListener('popstate', function(event) {
      console.log('popstate fired!');

      updateContent(event.state);
    });

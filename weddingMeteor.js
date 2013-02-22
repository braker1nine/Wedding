WeddingParty = new Meteor.Collection("weddingparty");
RSVPs = new Meteor.Collection("RSVPs");

if (Meteor.isClient) {

    Template.rsvpButton.rsvpComplete = function() {
      return Session.get('rsvpComplete');
    };

    Template.rsvpButton.events({
      'click, touchend':function(e){
        e.stopPropagation();
        $('.thickbox').fadeIn();
        $('#thickboxBackdrop').fadeIn();
      }
    });

    Template.rsvpButton.hidden = function() {
      if ('ontouchstart' in window) {
        return 'hidden';
      }
    }

    Template.replyCard.events({
      'click .salutation .option:not(.circled), touchend .salutation .option:not(.circled)': function(e){
        $(e.target).parent().children('.circled').removeClass('circled');
        $(e.target).addClass('circled');
        $('input#salutation').attr('value', e.target.dataset.value);
      },

      'click .reply_status .box:not(.checked), touchend .reply_status .box:not(.checked), click .reply_status .option, touchend .reply_status .option':function(e){
        $(e.target).parents('.reply_status').find('.box').removeClass('checked');
        $(e.target).parents('.reply_status').find('.box[data-value="'+e.target.dataset.value+'"]').addClass('checked');
        $('input#reply_status').attr('value', e.target.dataset.value);
      },

      'click #submit, touchend #submit': function(e){
        e.preventDefault();
        var dataset = {};
        $('input:not([type="submit"]), textarea').each(function(){
          dataset[$(this).attr('name')] = $(this).val();
        });

        var errors = {},
            allClean = true;

        // Validate Data
        if (dataset.name == undefined || dataset.name == "") {
          errors.name = true;
          allClean = false;
        }

        if (dataset.count == undefined || dataset.count == "" || dataset.count == 0) {
          errors.count = true;
          allClean = false;
        }

        if (dataset.reply_status == undefined || dataset.reply_status == "") {
          errors.reply_status = true;
          allClean = false;
        }

        if (!allClean) {
          $(e.target).parents('.thickbox').children('.title').addClass('error');
          for (var key in errors) {
            $('input[name="'+key+'"]').parents('.doublerow').addClass('error');
          }
        } else {
          Meteor.call('sendRSVPEmail', dataset);
          $('.thickbox').fadeOut();
          $('#thickboxBackdrop').fadeOut();
          var weddingDatep1 = new Date(2013, 3, 1);
          document.cookie += "rsvp=true;expires="+weddingDatep1.toUTCString();
          Session.set('rsvpComplete', true);
        }
        console.log(dataset);
      }


    });

    Template.partyList.members = function () {
      return WeddingParty.find({},{sort: {displayOrder:1}});
    };

    Template.partyList.events({
      'click a':function(e){
        $('.partyList').removeClass('shown');
      }
    });

    Template.partyMembers.members = function() {
      return WeddingParty.find({},{sort: {displayOrder:1}});
    }

    Template.weddingParty.hisOrHer = function(){
      return (this.partyType == 'bridesmaid' ? 'Her':'His');
    }

    Template.weddingParty.titleClass = function() {
      return (this.partyType == 'bridesmaid' ? 'cursive':'tk-silkscreen');
    }

    Template.countdown.countdown = function (){
      var weddingDate = new Date(2013, 2, 23),
      today = Date.now()

      //Get 1 day in milliseconds
      var one_day=1000*60*60*24;

      var days = Math.ceil((weddingDate.getTime()-today)/(one_day));

      return days;
    }
  

  Meteor.startup(function() {

    Session.set('rsvpComplete', document.cookie.match('rsvp=') != null);

    $('body').bind('touchstart', function(e) {
    });
    if (!document.cookie.match('homescreen') && !window.navigator.standalone && (window.navigator.userAgent.search("iPhone") > -1 || window.navigator.userAgent.search("iPad") > -1)) {
      $('#homescreen').fadeIn('slow');
      $(window).one('touchstart', function(){
        $('#homescreen').fadeOut('slow');
      });
      document.cookie += "homescreen=true";
    }

    $('li.weddingParty').on('tap click', function(e){
      $('.partyList').toggleClass('shown');
    });

    $('#thickboxBackdrop').on('tap click', function(e){
      debugger;
      $('.thickbox').fadeOut();
      $('#thickboxBackdrop').fadeOut();
    })
  });
}

if (Meteor.isServer) {

  Meteor.methods({
    sendRSVPEmail: function(data) {
      console.log(data);
      var subject = "",
          name = "",
          body = "";

      if (data.salutation && data.salutation != "") {
        name += data.salutation.slice(0,1).toUpperCase();
        name += data.salutation.slice(1);
        if (data.salutation == "mr" || data.salutation == "mrs") name += ".";
        name += " ";
      }
      name += data.name;
      subject += name;
      subject += " has RSVPed '" + data.reply_status + "'";

      body += "<h2>RSVP</h2>";
      body += "<b>Name:</b> " + name + "<br>";
      body += "<b>Reply:</b> " + data.reply_status + "<br>";
      body += "<b>No. Attending:</b> " + data.count + "<br>";
      body += "<b>Notes:</b> " + data.notes + "<br>";


      Email.send({
        to:'',
        cc:['chris.brakebill@gmail.com', 'laureneleseramsey@gmail.com'],
        from: 'chris@rambill.com',
        subject:subject,
        html:body
      })
    }
  });

  Meteor.startup(function () {
    // code to run on server at startup

    var members = {
      carrie: {
        firstName:'Carrie Jo',
        lastName: 'Pinckard',
        partyType: 'bridesmaid',
        title: 'Maid of Honor',
        location: 'Knoxville, TN',
        occupation: 'Capturer of Light a.k.a. Photographer',
        fromLauren: 'I met Carrie Jo at Berry. But I\'d say our true friendship didn\'t begin until she graduated.'+
          ' Soon after, we were livin\' large on a boat on the Tennessee River. She is my person, we just get each other.'+
          ' In the past four years, our friendship has grown to be one of the deepest I\'ve ever known. '+
          'Carrie Jo is my beautiful/talented/creative/driven Maid of Honor! Think this will keep her from being my photographer? '+
          'Think again. I can\'t help it, I just believe in her work.',
        displayOrder: 1
      },
      henry: {
        firstName: 'Henry',
        lastName: 'Shiflett',
        partyType: 'groomsman',
        title: 'Best Man',
        location: 'Harrogate, TN',
        occupation: 'Student of the human body.',
        fromChris:'Henry and I have been friends since sometime in the 6th grade. He\'s always been one of those people that was'+
        ' easy for anyone to befriend. And he was the same with me. Our friendship has been through Barrier Island and Grand Cayman. '+
        'It very nearly took us both to Virginia Tech, but did end up with us both at Tennessee. Henry\'s outgoing and friendly'+
        ' nature complimented my quieter, relaxed personality. And what\'s amazing is how much of this wedding party I wouldn\'t know '+
        'if it weren\'t for my friendship with him (And I would likely never have met Lauren, so there\'s that). His friendship has been '+
        'the easiest thing I\'ve known and that\'s why it\'s lasted so long. And will continue to do so for a long time.',
        displayOrder: 2
      },
      kate: {
        firstName: 'Kate',
        lastName: 'Ledbetter',
        partyType: 'bridesmaid',
        title: 'Matron of Honor',
        location: 'Asheville, NC',
        occupation: 'Planning Machine',
        fromLauren: 'Best Matron of Honor EVER! You know you\'re jealous. I mean she\'s the best event planner I know!'+
          ' Kate and i lived together for three years in college and her roommate-ness is SO good, Chris will have a challenge beating it! '+
          'Her relationship and marriage to Joel has been and continues to be such a testimony to me. '+
          'It\'s been amazing to watch her become the beautiful wife she is. Time with Kate is always light and refreshing. '+
          'She brings joy and beauty everywhere she is and I love her so dearly.',
        displayOrder: 3
      },
      stuart: {
        firstName: 'Stuart',
        lastName: 'Deaderick',
        partyType: 'groomsman',
        title: 'Man of Honor',
        location: 'Memphis, TN',
        occupation: 'Apprentice Body Mechanic',
        fromChris: 'Stuart is one of the many friends I met through Henry. We became roommates my sophomore year of college when I transferred to Tennessee. The first memory I have of him was a bonfire we had at Henry\'s, when Jon Van Hoesen accidentally sprayed Stu in the face with a fire extinguisher. I sometimes wonder if he got along with me because I was finally a friend who was weirder than him. Stuart and I bonded over a love of Jimmy Buffett. One summer, Stu and I took a camping trip to the Outer Banks, where we sampled various North Carolina BBQ/seafood joints and drank Landshark on the beach (oh and we listened to Jimmy Buffett the whole way there). Stu has always been good about telling my like it is when I\'m down about something, and helping get me back on track.',
        displayOrder: 4
      },
      jess: {
        firstName: 'Jess',
        lastName: 'Garner',
        partyType: 'bridesmaid',
        title: 'Nerts Pro', // Cookie monster?
        location: 'Knoxville, TN',
        occupation: 'Light Capturer & Counselor',
        fromLauren: 'JFG. The shortest of friendships listed here yet it feels like we\'ve been close a lot longer.'+
          ' Jess jumped into my life quickly last year and I couldn\'t be more thankful. '+
          'We could be having a deep hear-to-heart one minute and dancing like fools the next. I love that about this girl. '+
          'Friendships like hers aren\'t easy to come by and I\'m so thankful for who she is. ',
        displayOrder: 5
      },
      mark: {
        firstName: 'Mark',
        lastName: 'Hoffman',
        partyType: 'groomsman',
        title: 'Mortal Kombat Expert',
        location: 'Johnson City, TN',
        occupation: 'ANOTHER student of the human body',
        fromChris: "Benjamin \"Been Jammin'\" Mark Hoffman. I remember Mr. Austin's homeroom with Mark in 6th grade, so he was probably one of the first people I met when I started at Webb. He eventually went on to West for high school, and we wouldn't be reunited until my sophomore year when he, Stuart, Henry, and I lived together. I quickly grew to appreciate him and his ability to talk about Tennessee football, 80s music, and intergalactic politics. His harmonizing abilities are beyond reproach. Mark is also a Youtube fiend, and we have him to thank for unearthing <a href=\"http://www.youtube.com/watch?v=BQAKRw6mToA\">this gem</a>",
        displayOrder: 6
      },
      avi: {
        firstName: 'Avi',
        lastName: 'Izzaguere',
        partyType: 'bridesmaid',
        title: 'Friend of the Bride',
        location: 'San Francisco, CA',
        occupation: 'Business and Culture',
        fromLauren: 'When I met Avi Izaguirre I thought she had to be the coolest Freshman girl in our class at Berry. '+
          'Super social, super gorgeous and super friendly. I didn\'t know that two years later we\'d be living life closely '+
          'together as Juniors and Seniors in Campus Outreach. Avi is the girl who will do ANYTHING with you. '+
          'She has a huge heart for culture, people and adventure and I LOVE that about her. A California girl now, '+
          'she comes from far away to be a part of this celebration and I\'m so glad she is.',
        displayOrder: 7
      },
      bret: {
        firstName: 'Bret',
        lastName: 'Vukoder',
        partyType: 'groomsman',
        title: 'Ryan Reynolds Fan',
        location: 'Pittsburgh, PA',
        occupation: 'Student of motion pictures',
        fromChris: "Oh sweet Bret. I think Bret and I first met shortly before we moved in together. When we were moving to a house our junior year we were looking for a couple additions to fill out all the rooms (it had SEVEN total), and Bret turned out to be one of the lucky few. Bret is genuinely one of the nicest people I\'ve ever met in my life. And also one of the uniquely strangest. In fact the roommates ranked us by weirdness, and Bret was narrowly defeated by me and another roommate Kelley. What I love about Bret is, as ridiculously silly as he can be, he's not afraid to be himself and have a real conversation with you.",
        displayOrder: 8
      },
      rachel: {
        firstName: 'Rachel',
        lastName: 'Abba',
        partyType: 'bridesmaid',
        title: 'Table',
        location: 'Powell, TN',
        occupation: 'Shaper of young minds',
        fromLauren: '(otherwise known as the R in BLARK) I met Rachel in the 6th grade at church when she was just a frizzy'+
          ' haired homeschooler in short flower overalls. In the 7th grade, she started at Powell Middle School and from then on,'+
          ' she\'s been one of my favorite people. Rach can make anything fun. I mean it, ANYTHING. But she\'s not just fun, we\'ve'+
          ' been through some life together that I couldn\'t imagine doing without her. I\'m so thankful we\'ve stayed close all these years. ',
        displayOrder: 9
      },
      jay: {
        firstName: 'Jay',
        lastName: 'Slagle',
        partyType: 'groomsman',
        title: 'True American',
        location: 'Knoxville, TN',
        occupation: 'All About the Benjamins',
        fromChris: "Jay is another friend that I met through Henry (and the only non-family groomsman I never lived with). He lived with Henry and Bret in the Grainger house, where Lauren and I first met. Jay has always been one of my favorite people to hang out with. Though I'm sure he'd hate to hear it, I think he's the friend who is the most like me. With his love for cats, sipping whiskey, and talking about Apple products, we always have a good time. He also may be one of the people that had to listen to me confess my love for Lauren the most, as he was such good friends with her, and he handled it swimmingly. Also, he has a healthy respect for the institution that is Krystal, which makes any man a proper gentleman.",
        displayOrder: 10
      },
      brianne: {
        firstName: 'Brianne',
        lastName: 'Lindauer',
        partyType: 'bridesmaid',
        title: 'Baby Mama',
        location: 'Powell, TN',
        occupation: 'NICU Nurse and momma',
        fromLauren: '(otherwise known as the B in BLARK): Brianne and I were in Mrs. Bragwell\'s 1st grade class together. '+
          'I remember the first time my dad and I walked up the street to her house in the snow to sled. '+
          'And after that, I can\'t remember a part of my childhood without her in it. We were in church together, school together, '+
          'lived in the same neighborhood and cheered on two different cheerleading teams together until we graduated high school. '+
          'And now, I\'ve been able to see her become a wonderful mother to soon-to-be two beautiful children! '+
          'Brianne is such a sweet voice in my life, I always cherish our time together. ',
        displayOrder: 11
      },
      brian: {
        firstName: 'Brian',
        lastName: 'Brakebill',
        partyType: 'groomsman',
        title: 'Woodsman',
        location: 'Knoxville, TN - for now',
        occupation: 'Trail blazer, Brawny Man',
        fromChris: 'The younger broseph. He\'s simply one of the chillest people I know. He\'s always game for a chill night of hanging out and watching football. We don\'t always agree, but we always appreciate each other in our disagreements. I recall him and I having a long argument about the firing of Philip Fulmer, that everyone eventually agreed had to stop, mostly because I think they were tired of hearing us. But of us were just too stubborn to stop until the other heard and agreed with our point. It\'s been really awesome to see him find his love in the outdoors and I can\'t wait to see where God takes him next. (And I hope I can visit whatever cool place it is). Fact: He\'s the only person I have a special handshake with. That\'s all you need to know.',
        displayOrder: 12
      },
      kasey: {
        firstName: 'Kasey',
        lastName: 'Burrow',
        partyType: 'bridesmaid',
        title: 'Lover of Houndstooth',
        location: 'Powell, TN',
        occupation: 'Penguins',
        fromLauren: '(otherwise known as the K in BLARK) I met Kasey in Mrs. Termon\'s 2nd grade class. We played softball together, '+
          'cheered together, went to the same church together and lived in the same neighborhood. I mean, we grew up together. '+
          'And after we grew up and graduated high school, we remained friends. From all sorts of distances we remained in support '+
          'and in celebration of one another\'s lives. She is one of the most loyal people I know. ',
        displayOrder: 13
      },
      keith: {
        firstName: 'Keith',
        lastName: 'Brakebill',
        partyType: 'groomsman',
        title: 'Inventor of "The Move"',
        location: 'Seattle, WA',
        occupation: 'Investment Manager',
        fromChris: 'The thing I remember most about Keith is the MANY games Brian and I would play with him. Baseball in the yard, too tough to tackle football, and basketball. We were always playing and creating new games. And he would beat us at everything. Always. And I can\'t think of anything more frustrating growing up than trying to stop his "move" in basketball. I think to this day he could still manage to score on us with that thing. Keith and I haven\'t always gotten along, but he is one of the smartest people I\'ve ever met. I\'ll never be able to express my thanks enough to he and Petra for welcoming me into their home and daily lives when I moved to Seattle. There\'s no way I would have made it without them.',
        displayOrder: 14
      },
      erin: {
        firstName: 'Erin',
        lastName:'Pate',
        partyType: 'bridesmaid',
        title: 'Eerie',
        location: 'Knoxville, TN',
        occupation: 'Shaper of young minds',
        fromChris: "She doesn\'t know it, but Erin is someone I've looked up to for a long time. When we were younger we weren't the best of friends. One Christmas I think I hit her over the head with the remote control, so she got to take my favorite present for a week (my hamster... lucky her). And I also recall carving some less than nice words into my desk about her and my mom when I was throwing one of my temper tantrums. But as we aged we grew to appreciate each other. When I graduated from high school & headed off to college, she wrote me a letter that is still one of my most prized posessions. One of my biggest regrets in college was not spending more time with her when she was going to class on the same campus as me. It's been such a joy to see her grow in her faith and to see her marry Ryan in that walk. We couldn't ask for a better brother-in-law (and we needed a male in the family who wasn't already balding).",
        displayOrder: 15
      },
      chase: {
        firstName: 'Chase',
        lastName: 'Ramsey',
        partyType: 'groomsman',
        title: 'Music Savant, Batmaniac',
        location: 'Cookeville, TN',
        occupation: 'Music Student',
        fromLauren: 'Chase is my brother but he is also one of my best friends. We\'ve come a long way from the days of arguing over the '+
        'TV remote and who won or didn\'t win Candyland. I\'ve always admired his ambition for the things he\'s most passionate about.'+
        ' When he found music, there was no stopping him. With each new achievement I was blown away. And to find out he wants to put all '+
        'that passion and talent into shaping young musicians isn\'t surprising to me at all. As busy as we both are, we seem to always '+
        'find time to talk and support one another. I\'m so thankful my brother will be standing with me on this day. ',
        displayOrder: 16
      },
      meghan: {
        firstName: 'Meghan',
        lastName: 'Francis',
        partyType: 'bridesmaid',
        title: 'Meggie Franchise',
        location: 'Ibadan, Nigeria',
        occupation: 'Music, African Adventures, & heat.',
        fromLauren: 'Meghan will be Bridesmaid #9 from afar... like, REALLY far. Through the ever amazing provision of God, Meghan moved '+
          'to Nigeria in August of 2012 and will be there through May of 2013. It\'s hard to imagine someone so important to me not being '+
          'a part of this day. But I am SO excited and thankful for the opportunity she has been given. Meghan and I became friends at '+
          'Berry and even closer friends living together for the past three years. When I think about my life in Knoxville after college, '+
          'I think of some amazing times I had with her and Carrie living in close community together. Meghan is my sandpaper, we\'re pretty different.'+
          ' And we learned to love each other a lot in those differences. I\'m so thankful for her friendship and beautiful, beautiful spirit. ',
        displayOrder: 17
      }
    }

    for (key in members) {
      members[key].id = key;
      if (WeddingParty.find({id:key}).count() == 0) {
        WeddingParty.insert(members[key])
      } else {
        WeddingParty.update({id:key}, {$set: members[key]});
      }
    }
  });
}

WeddingParty = new Meteor.Collection("weddingparty");


if (Meteor.isClient) {

  Template.partyList.members = function () {
    return WeddingParty.find({},{sort: {displayOrder:1}});
  }

  Template.partyList.events({
    'click li.weddingParty':function(e){
      debugger;
      $('.partyList').toggleClass('hidden');
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
    console.log('HOLY SHIT');
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    var members = {
      carrie: {
        firstName:'Carrie Jo',
        lastName: 'Pinckard',
        partyType: 'bridesmaid',
        title: 'Maid of Honor',
        location: 'Knoxville, TN',
        hometown: 'Lickskillet, GA',
        occupation: 'Capturer of Light',
        fromLauren: 'I met Carrie Jo at Berry. But I\'d say our true friendship didn\'t begin until she graduated.'+
          ' Soon after, we were livin\' large on a boat on the Tennessee River. She is my person, we just get each other.'+
          ' In the past four years, our friendship has grown to be one of the deepest I\'ve ever known. '+
          'Carrie Jo is my beautiful/talented/creative/driven Maid of Honor! Think this will keep her from being my photographer? '+
          'Think again. I can\'t help it, I just believe in her work.',
        imageUrl:'https://sphotos-b.xx.fbcdn.net/hphotos-snc6/222140_646452587248_978605065_n.jpg',
        displayOrder: 1
      },
      henry: {
        firstName: 'Henry',
        lastName: 'Shiflett',
        partyType: 'groomsman',
        title: 'Best Man',
        location: 'Harrogate, TN',
        hometown: 'Knoxville, TN',
        occupation: 'Student of the human body.',
        fromChris:'Henry and I have been friends since sometime in the 6th grade. He\'s always been one of those people that was'+
        ' easy for anyone to befriend. And he was the same with me. Our friendship has been through Barrier Island and Grand Cayman. '+
        'It very nearly took us both to Virginia Tech, but did end up with us both at Tennessee. Henry\'s outgoing and friendly'+
        ' nature complimented my quieter, relaxed personality. And what\'s amazing is how much of this wedding party I wouldn\'t know '+
        'if it weren\'t for my friendship with him (And I would likely never have met Lauren, so there\'s that). His friendship has been '+
        'the easiest thing I\'ve known and that\'s why it\'s lasted so long. And will continue to do so for a long time.',
        imageUrl: 'http://commondatastorage.googleapis.com/rambillwedding/images/henry.jpg',
        displayOrder: 2
      },
      kate: {
        firstName: 'Kate',
        lastName: 'Ledbetter',
        partyType: 'bridesmaid',
        title: 'Matron of Honor',
        location: 'Asheville, NC',
        hometown: '',
        occupation: 'Planning Machine',
        fromLauren: 'Best Matron of Honor EVER! You know you\'re jealous. I mean she\'s the best event planner I know!'+
          ' Kate and i lived together for three years in college and her roommate-ness is SO good, Chris will have a challenge beating it! '+
          'Her relationship and marriage to Joel has been and continues to be such a testimony to me. '+
          'It\'s been amazing to watch her become the beautiful wife she is. Time with Kate is always light and refreshing. '+
          'She brings joy and beauty everywhere she is and I love her so dearly.',
        imageUrl: '',
        displayOrder: 3
      },
      stuart: {
        firstName: 'Stuart',
        lastName: 'Deaderick',
        partyType: 'groomsman',
        title: 'Man of Honor',
        location: 'Memphis, TN',
        hometown: 'Knoxville, TN',
        occupation: 'Apprentice Body Mechanic',
        fromChris: 'Stuart is one of the many friends I met through Henry. We became roommates my sophomore year of college when I transferred to Tennessee. The first memory I have of him was a bonfire we had at Henry\'s, when Jon Van Hoesen accidentally sprayed Stu in the face with a fire extinguisher. I sometimes wonder if he got along with me because I was finally a friend who was weirder than him. Stuart and I bonded over a love of Jimmy Buffett. One summer, Stu and I took a camping trip to the Outer Banks, where we sampled various North Carolina BBQ joints and drank Landshark on the beach (oh and we listened to Jimmy Buffett the whole way there). Stu has always been good about telling my like it is when I\'m down about something, and helping get me back on track.',
        imageUrl: '',
        displayOrder: 4
      },
      jess: {
        firstName: 'Jess',
        lastName: 'Garner',
        partyType: 'bridesmaid',
        title: 'Nerts Pro', // Cookie monster?
        location: 'Knoxville, TN',
        hometown: '?',
        occupation: 'Light Capturer & Counselor',
        fromLauren: 'JFG. The shortest of friendships listed here yet it feels like we\'ve been close a lot longer.'+
          ' Jess jumped into my life quickly last year and I couldn\'t be more thankful. '+
          'We could be having a deep hear-to-heart one minute and dancing like fools the next. I love that about this girl. '+
          'Friendships like hers aren\'t easy to come by and I\'m so thankful for who she is. ',
        imageUrl: '',
        displayOrder: 5
      },
      mark: {
        firstName: 'Mark',
        lastName: 'Hoffman',
        partyType: 'groomsman',
        title: 'Mortal Kombat Expert',
        location: 'Johnson City, TN',
        hometown: 'Knoxville, TN',
        occupation: 'ANOTHER student of the human body',
        fromChris: 'Benjamin "Been Jammin\'" Mark Hoffman. I remember Mr. Austin\'s homeroom with Mark in 6th grade, so he was probably one of the first people I met when I started at Webb. He eventually went on to West for high school, so we wouldn\'t be reunited until my sophomore year when he, Stuart, Henry, and I lived together. I quickly grew to appreciate him and his ability to talk about Tennessee football, 80s music, and intergalactic politics.',
        imageUrl: '',
        displayOrder: 6
      },
      avi: {
        firstName: 'Avi',
        lastName: 'Izzaguere',
        partyType: 'bridesmaid',
        title: 'Friend of the Bride',
        location: 'San Francisco, CA',
        hometown: '?',
        occupation: '?',
        fromLauren: 'When I met Avi Izaguirre I thought she had to be the coolest Freshman girl in our class at Berry. '+
          'Super social, super gorgeous and super friendly. I didn\'t know that two years later we\'d be living life closely '+
          'together as Juniors and Seniors in Campus Outreach. Avi is the girl who will do ANYTHING with you. '+
          'She has a huge heart for culture, people and adventure and I LOVE that about her. A California girl now, '+
          'she comes from far away to be a part of this celebration and I\'m so glad she is.',
        imageUrl: '',
        displayOrder: 7
      },
      bret: {
        firstName: 'Bret',
        lastName: 'Vukoder',
        partyType: 'groomsman',
        title: 'Ryan Reynolds Fan',
        location: 'Pittsburgh, PA',
        hometown: 'Knoxville, TN',
        occupation: 'Student of motion pictures',
        fromChris: 'Oh sweet Bret. I think Bret and I first met shortly before we moved in together. When we were moving to a house our junior year we were looking for a couple additions to fill out all the rooms (it had SEVEN total), and Bret turned out to be one of the lucky few. Bret is one of the nicest people I\'ve ever met in my life. And also one of the uniquely strangest. In fact the roommates ranked us by weirdness, and Bret was narrowly defeated by me and another roommate Kelley.',
        imageUrl: '',
        displayOrder: 8
      },
      rachel: {
        firstName: 'Rachel',
        lastName: 'Abba',
        partyType: 'bridesmaid',
        title: 'Table',
        location: 'Powell, TN',
        hometown: 'Powell, TN',
        occupation: 'Shaper of young minds',
        fromLauren: '(otherwise known as the R in BLARK) I met Rachel in the 6th grade at church when she was just a frizzy'+
          ' haired homeschooler in short flower overalls. In the 7th grade, she started at Powell Middle School and from then on,'+
          ' she\'s been one of my favorite people. Rach can make anything fun. I mean it, ANYTHING. But she\'s not just fun, we\'ve'+
          ' been through some life together that I couldn\'t imagine doing without her. I\'m so thankful we\'ve stayed close all these years. ',
        imageUrl: '',
        displayOrder: 9
      },
      jay: {
        firstName: 'Jay',
        lastName: 'Slagle',
        partyType: 'groomsman',
        title: 'True American',
        location: 'Knoxville, TN',
        hometown: 'Knoxville, TN',
        occupation: 'Gumdrops',
        fromChris: 'Jay is another friend that I really met through Henry. He lived with Henry and Bret in the Grainger house, where Lauren and I\'s love began. Jay has always been one of my favorite people to hang out with. He\'s maybe the most like me, with his love for just hanging out with a few people, sipping whiskey, and talking about Apple products. He also may be one of the people that had to listen to me confess my love for Lauren the most, as he was such good friends with her, and he handled it swimmingly.',
        imageUrl: '',
        displayOrder: 10
      },
      brianne: {
        firstName: 'Brianne',
        lastName: 'Lindauer',
        partyType: 'bridesmaid',
        title: 'Baby Mama',
        location: 'Powell, TN',
        hometown: 'Powell, TN',
        occupation: 'Baby Mama?',
        fromLauren: '(otherwise known as the B in BLARK): Brianne and I were in Mrs. Bragwell\'s 1st grade class together. '+
          'I remember the first time my dad and I walked up the street to her house in the snow to sled. '+
          'And after that, I can\'t remember a part of my childhood without her in it. We were in church together, school together, '+
          'lived in the same neighborhood and cheered on two different cheerleading teams together until we graduated high school. '+
          'And now, I\'ve been able to see her become a wonderful mother to soon-to-be two beautiful children! '+
          'Brianne is such a sweet voice in my life, I always cherish our time together. ',
        imageUrl: '',
        displayOrder: 11
      },
      brian: {
        firstName: 'Brian',
        lastName: 'Brakebill',
        partyType: 'groomsman',
        title: 'Woodsman',
        location: 'Knoxville, TN - for now',
        hometown: 'Knoxville, TN',
        occupation: 'Light Capturer, Counselor',
        fromChris: 'The younger broseph. He\'s simply one of the chillest people I know. He\'s always game for a chill night of hanging out and watching football. We don\'t always agree, but we always appreciate each other in our disagreements. I recall him and I having a long argument about the firing of Philip Fulmer, that everyone eventually agreed had to stop, mostly because I think they were tired of hearing us. But of us were just too stubborn to stop until the other heard and agreed with our point.',
        imageUrl: '',
        displayOrder: 12
      },
      kasey: {
        firstName: 'Kasey',
        lastName: 'Burrow',
        partyType: 'bridesmaid',
        title: 'Lover of Houndstooth...',
        location: 'Powell, TN',
        hometown: 'Powell, TN',
        occupation: '?',
        fromLauren: '(otherwise known as the K in BLARK) I met Kasey in Mrs. Termon\'s 2nd grade class. We played softball together, '+
          'cheered together, went to the same church together and lived in the same neighborhood. I mean, we grew up together. '+
          'And after we grew up and graduated high school, we remained friends. From all sorts of distances we remained in support '+
          'and in celebration of one another\'s lives. She is one of the most loyal people I know. ',
        imageUrl: '',
        displayOrder: 13
      },
      keith: {
        firstName: 'Keith',
        lastName: 'Brakebill',
        partyType: 'groomsman',
        title: 'Vol Fan, Basketball Cheater',
        location: 'Seattle, WA',
        hometown: 'Knoxville, TN',
        occupation: 'Investment Manager',
        fromChris: 'The thing I remember most about Keith is the MANY games Brian and I would play with him. Baseball in the yard, too tough to tackle football, and basketball. And he would beat us at everything. Always. And I can\'t think of anything more frustrating growing up than trying to stop his "move" in basketball.',
        imageUrl: '',
        displayOrder: 14
      },
      erin: {
        firstName: 'Erin',
        lastName:'Pate',
        partyType: 'bridesmaid',
        title: 'Girl - I\'m getting lazy',
        location: 'Knoxville, TN',
        hometown: 'Knoxville, TN',
        occupation: 'Shaper of young minds',
        fromChris: '',
        imageUrl: '',
        displayOrder: 15
      },
      chase: {
        firstName: 'Chase',
        lastName: 'Ramsey',
        partyType: 'groomsman',
        title: 'Music Savant, Batmaniac',
        location: 'Cookeville, TN',
        hometown: 'Knoxville, TN',
        occupation: 'Music Student',
        fromLauren: 'This is a message',
        imageUrl: '',
        displayOrder: 16
      },
      meghan: {
        firstName: 'Meghan',
        lastName: 'Francis',
        partyType: 'bridesmaid',
        title: 'Meggie Franchise, African Adventuress',
        location: 'Africa?',
        hometown: 'Somewhere in Alaska',
        occupation: 'Master of disguise',
        fromLauren: 'Meghan will be Bridesmaid #9 from afar... like, REALLY far. Through the ever amazing provision of God, Meghan moved '+
          'to Nigeria in August of 2012 and will be there through May of 2013. It\'s hard to imagine someone so important to me not being '+
          'a part of this day. But I am SO excited and thankful for the opportunity she has been given. Meghan and I became friends at '+
          'Berry and even closer friends living together for the past three years. When I think about my life in Knoxville after college, '+
          'I think of some amazing times I had with her and Carrie living in close community together. Meghan is my sandpaper, we\'re pretty different.'+
          ' And we learned to love each other a lot in those differences. I\'m so thankful for her friendship and beautiful, beautiful spirit. ',
        imageUrl:'',
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

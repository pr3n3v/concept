import pptxgenjs from 'pptxgenjs';

export async function generateTheNextLeaderPPT(): Promise<void> {
  const pres = new pptxgenjs();
  
  // Set 16:9 widescreen presentation
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'The Next Leader Production Team';
  pres.company = 'The Next Leader Television Network';
  pres.title = 'The Next Leader - Official Format Bible & Series Pitch Deck';

  // Palette constants
  const C_DARK_BG = '0B1120';
  const C_CARD_BG = '1E293B';
  const C_CARD_INNER = '0F172A';
  const C_AMBER = 'F59E0B';
  const C_GOLD = 'D97706';
  const C_WHITE = 'FFFFFF';
  const C_MUTED = '94A3B8';
  const C_EMERALD = '10B981';

  // ----------------------------------------------------
  // SLIDE 1: Title Slide (Grand Pitch Cover)
  // ----------------------------------------------------
  const slide1 = pres.addSlide();
  slide1.background = { color: C_DARK_BG };

  // Subtle accent bar top
  slide1.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: '100%', h: 0.15,
    fill: { color: C_AMBER }
  });

  // Tag badge
  slide1.addText('HIGH-STAKES PRIMETIME POLITICAL REALITY TELEVISION', {
    x: 0.8, y: 1.2, w: 8.5, h: 0.4,
    fontSize: 12, bold: true, color: C_AMBER, charSpacing: 2
  });

  // Main Title
  slide1.addText('THE NEXT LEADER', {
    x: 0.8, y: 1.6, w: 10.0, h: 1.2,
    fontSize: 52, bold: true, color: C_WHITE, fontFace: 'Georgia'
  });

  // Subtitle
  slide1.addText('Format Bible, Production Architecture & 70-Day Season Arc', {
    x: 0.8, y: 2.8, w: 10.0, h: 0.5,
    fontSize: 18, color: C_MUTED
  });

  // Divider line
  slide1.addShape(pres.ShapeType.line, {
    x: 0.8, y: 3.5, w: 8.5, h: 0,
    line: { color: C_AMBER, width: 2 }
  });

  // Pitch premise callout box
  slide1.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 3.8, w: 11.7, h: 1.7,
    rectRadius: 0.1,
    fill: { color: C_CARD_BG },
    line: { color: '334155', width: 1 }
  });

  slide1.addText(
    '"Democracy is not merely a vote once every five years; in The Next Leader, every single sunrise is a live test of public mandate."',
    {
      x: 1.1, y: 4.0, w: 11.1, h: 0.7,
      fontSize: 14, italic: true, color: C_WHITE, align: 'center'
    }
  );

  slide1.addText(
    '26 Aspiring Political Contenders  |  70 Days in The Capitol House  |  ₹5 Crore ($600,000) Campaign Seed Grant  |  88 Broadcast Cameras',
    {
      x: 1.1, y: 4.8, w: 11.1, h: 0.5,
      fontSize: 11, bold: true, color: C_AMBER, align: 'center'
    }
  );

  // Footer metadata
  slide1.addText('Season 1 Confidential Pitch Deck  |  Executive Series Bible', {
    x: 0.8, y: 6.8, w: 8.0, h: 0.3,
    fontSize: 10, color: C_MUTED
  });

  // ----------------------------------------------------
  // SLIDE 2: Executive Overview & Key Pillars
  // ----------------------------------------------------
  const slide2 = pres.addSlide();
  slide2.background = { color: C_DARK_BG };

  slide2.addText('FORMAT PILLARS', {
    x: 0.8, y: 0.5, w: 5.0, h: 0.3,
    fontSize: 11, bold: true, color: C_AMBER, charSpacing: 1.5
  });
  slide2.addText('The Tri-Cameral Power Structure', {
    x: 0.8, y: 0.8, w: 9.0, h: 0.6,
    fontSize: 28, bold: true, color: C_WHITE, fontFace: 'Georgia'
  });

  // 3 Pillar Cards
  const pillars = [
    {
      title: 'I. The Senate Chamber Floor',
      tag: 'Internal Legislative Combat',
      color: C_AMBER,
      items: [
        '26 brass-crested member desks with full legislative docket',
        'Daily debates on actual constitutional and agrarian crises',
        'Passing bills unlocks house budget, regional cuisine & amenities',
        '24-hour standing filibusters test physical & oratorical stamina'
      ]
    },
    {
      title: 'II. Zameen Pe Jung',
      tag: 'Real-World Turf & Field Missions',
      color: C_EMERALD,
      items: [
        'Bused into real communities: grain mandis, drought basins & slums',
        'Evaluated by actual farmers, local panchayats & shopkeepers',
        'Victor claims the coveted Sengol of Immunity',
        'Production donates ₹25 Lakh civic capital directly to the community'
      ]
    },
    {
      title: 'III. The Electorate (Janta)',
      tag: 'Direct Viewer Mandate',
      color: '38BDF8',
      items: [
        '100M+ projected digital and mobile app viewer votes',
        'Weekly approval tracking dictates the "Janta Ka Veto" clemency',
        'Viewers vote live during Sunday galas on debate agendas & sanctions',
        'Winner crowned exclusively by nationwide popular mandate'
      ]
    }
  ];

  pillars.forEach((p, idx) => {
    const cardX = 0.8 + idx * 4.0;
    slide2.addShape(pres.ShapeType.roundRect, {
      x: cardX, y: 1.6, w: 3.7, h: 4.8,
      rectRadius: 0.1,
      fill: { color: C_CARD_BG },
      line: { color: '334155', width: 1 }
    });

    slide2.addText(p.tag.toUpperCase(), {
      x: cardX + 0.2, y: 1.8, w: 3.3, h: 0.3,
      fontSize: 9, bold: true, color: p.color
    });

    slide2.addText(p.title, {
      x: cardX + 0.2, y: 2.1, w: 3.3, h: 0.5,
      fontSize: 16, bold: true, color: C_WHITE, fontFace: 'Georgia'
    });

    // Divider
    slide2.addShape(pres.ShapeType.line, {
      x: cardX + 0.2, y: 2.7, w: 3.3, h: 0,
      line: { color: '475569', width: 0.75 }
    });

    // Bullet items
    p.items.forEach((item, i) => {
      slide2.addText(`•  ${item}`, {
        x: cardX + 0.2, y: 2.9 + i * 0.8, w: 3.3, h: 0.7,
        fontSize: 11, color: C_MUTED
      });
    });
  });

  // ----------------------------------------------------
  // SLIDE 3: The 7-Day Weekly Broadcast Engine
  // ----------------------------------------------------
  const slide3 = pres.addSlide();
  slide3.background = { color: C_DARK_BG };

  slide3.addText('PRODUCTION RHYTHM', {
    x: 0.8, y: 0.5, w: 5.0, h: 0.3,
    fontSize: 11, bold: true, color: C_AMBER, charSpacing: 1.5
  });
  slide3.addText('The 7-Day Clockwork Broadcast Cycle', {
    x: 0.8, y: 0.8, w: 10.0, h: 0.6,
    fontSize: 28, bold: true, color: C_WHITE, fontFace: 'Georgia'
  });

  const weekDays = [
    { day: 'MON (Somwar)', phase: 'Gathbandhan War Rooms', desc: 'Faction meetings, whip counts, Speaker issues weekly bill docket.' },
    { day: 'TUE (Mangalwar)', phase: 'Zameen Pe Jung (Field)', desc: 'Outdoor civic crisis in real communities. Winner wins the Sengol of Immunity.' },
    { day: 'WED (Budhwar)', phase: '3 AM Crisis & Press Varta', desc: 'Unannounced 3 AM emergency scrums followed by grilling by senior political editors.' },
    { day: 'THU (Guruwar)', phase: 'Floor Debate & Zero Hour', desc: 'Calling Attention motions, No-Confidence tests, and consensus voting.' },
    { day: 'FRI (Shukrawar)', phase: 'Janta Ki Adalat (Poll Closes)', desc: 'National approval rating revealed; Janta Ka Veto (Executive Clemency) awarded.' },
    { day: 'SAT (Shanivar)', phase: 'Gupt Matdaan (Secret Vault)', desc: 'Solitary walk into teakwood vault; wax-sealed slips dropped in brass urn.' },
    { day: 'SUN (Ravivar)', phase: 'Maha-Elimination Live Gala', desc: '2.5-hr nationwide live broadcast; floor standing vote eliminates one contender.' }
  ];

  weekDays.forEach((wd, idx) => {
    const yPos = 1.6 + idx * 0.68;
    const isSpecial = idx === 1 || idx === 5 || idx === 6;

    slide3.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: yPos, w: 11.7, h: 0.58,
      rectRadius: 0.08,
      fill: { color: isSpecial ? '1E293B' : C_CARD_INNER },
      line: { color: isSpecial ? C_AMBER : '334155', width: isSpecial ? 1 : 0.75 }
    });

    slide3.addText(wd.day, {
      x: 1.0, y: yPos + 0.1, w: 2.2, h: 0.38,
      fontSize: 11, bold: true, color: isSpecial ? C_AMBER : C_WHITE
    });

    slide3.addText(wd.phase, {
      x: 3.3, y: yPos + 0.1, w: 3.6, h: 0.38,
      fontSize: 11, bold: true, color: C_WHITE
    });

    slide3.addText(wd.desc, {
      x: 7.0, y: yPos + 0.1, w: 5.3, h: 0.38,
      fontSize: 10.5, color: C_MUTED
    });
  });

  // ----------------------------------------------------
  // SLIDE 4: Gupt Matdaan & Eviction Protocol
  // ----------------------------------------------------
  const slide4 = pres.addSlide();
  slide4.background = { color: C_DARK_BG };

  slide4.addText('NOMINATION & EVICTION PROTOCOL', {
    x: 0.8, y: 0.5, w: 6.0, h: 0.3,
    fontSize: 11, bold: true, color: C_AMBER, charSpacing: 1.5
  });
  slide4.addText('Gupt Matdaan Kaksh & Sunday Live Eviction', {
    x: 0.8, y: 0.8, w: 11.0, h: 0.6,
    fontSize: 28, bold: true, color: C_WHITE, fontFace: 'Georgia'
  });

  const evictionSteps = [
    { num: '01', title: 'The Sengol Presentation', text: 'Winner of Tuesday outdoor task raises the Sengol of Immunity; they & 1 chosen ally are unconditionally safe.' },
    { num: '02', title: 'The Solitary Midnight Walk', text: 'Saturday midnight. Each contender walks alone into the soundproof teakwood Gupt Matdaan Kaksh.' },
    { num: '03', title: 'Recorded Camera Justification', text: 'Facing a solitary studio lens, the contender names two candidates and details policy or moral betrayals.' },
    { num: '04', title: 'The Wax-Sealed Matdaan Peti', text: 'Ballots marked with wax seals are dropped into the solid brass urn. Top vote recipients face the chopping block.' },
    { num: '05', title: 'Janta Ka Veto (Clemency)', text: 'Top recipient of the nationwide viewer poll can overturn one nomination live on air before the floor vote.' },
    { num: '06', title: 'Sunday Live Standing Vote', text: 'During the live gala, non-nominated members stand and openly vote before the nation to evict one contender.' }
  ];

  evictionSteps.forEach((st, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const xPos = 0.8 + col * 5.9;
    const yPos = 1.6 + row * 1.6;

    slide4.addShape(pres.ShapeType.roundRect, {
      x: xPos, y: yPos, w: 5.7, h: 1.4,
      rectRadius: 0.1,
      fill: { color: C_CARD_BG },
      line: { color: '334155', width: 1 }
    });

    slide4.addText(st.num, {
      x: xPos + 0.2, y: yPos + 0.15, w: 0.8, h: 0.4,
      fontSize: 20, bold: true, color: C_AMBER, fontFace: 'Georgia'
    });

    slide4.addText(st.title, {
      x: xPos + 1.0, y: yPos + 0.18, w: 4.4, h: 0.35,
      fontSize: 13, bold: true, color: C_WHITE
    });

    slide4.addText(st.text, {
      x: xPos + 1.0, y: yPos + 0.55, w: 4.4, h: 0.75,
      fontSize: 10.5, color: C_MUTED
    });
  });

  // ----------------------------------------------------
  // SLIDE 5: Outdoor Missions & Civic Legacy
  // ----------------------------------------------------
  const slide5 = pres.addSlide();
  slide5.background = { color: C_DARK_BG };

  slide5.addText('REAL-WORLD TURF', {
    x: 0.8, y: 0.5, w: 5.0, h: 0.3,
    fontSize: 11, bold: true, color: C_AMBER, charSpacing: 1.5
  });
  slide5.addText('Zameen Pe Jung: Community Impact & Missions', {
    x: 0.8, y: 0.8, w: 11.0, h: 0.6,
    fontSize: 28, bold: true, color: C_WHITE, fontFace: 'Georgia'
  });

  const missions = [
    { state: 'Maharashtra', location: 'Jalna, Marathwada', task: 'Marathwada Jaldhara', desc: 'Solar micro-irrigation grid negotiation between 4 drought-affected gram panchayats.' },
    { state: 'Maharashtra', location: 'Dharavi, Mumbai', task: 'Dharavi Karigar Accord', desc: 'Smokeless ceramic kiln transition and small-workshop land title consensus.' },
    { state: 'Haryana', location: 'Karnal APMC Mandi', task: 'Karnal Mandi Sangram', desc: 'Digital weighbridge dispute mediation between commission agents and farmer unions.' },
    { state: 'Assam', location: 'Majuli River Island', task: 'Brahmaputra Flood Logistics', desc: 'Evacuation corridor optimization and solar boat mobile clinic deployment.' },
  ];

  missions.forEach((m, idx) => {
    const cardX = 0.8 + idx * 3.0;
    slide5.addShape(pres.ShapeType.roundRect, {
      x: cardX, y: 1.6, w: 2.8, h: 3.2,
      rectRadius: 0.1,
      fill: { color: C_CARD_BG },
      line: { color: '334155', width: 1 }
    });

    slide5.addText(m.state.toUpperCase(), {
      x: cardX + 0.15, y: 1.8, w: 2.5, h: 0.25,
      fontSize: 9, bold: true, color: C_AMBER
    });

    slide5.addText(m.task, {
      x: cardX + 0.15, y: 2.1, w: 2.5, h: 0.45,
      fontSize: 13, bold: true, color: C_WHITE
    });

    slide5.addText(m.location, {
      x: cardX + 0.15, y: 2.6, w: 2.5, h: 0.3,
      fontSize: 10, italic: true, color: C_AMBER
    });

    slide5.addText(m.desc, {
      x: cardX + 0.15, y: 3.0, w: 2.5, h: 1.5,
      fontSize: 10, color: C_MUTED
    });
  });

  // Civic Legacy Box below
  slide5.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 5.1, w: 11.7, h: 1.5,
    rectRadius: 0.1,
    fill: { color: C_CARD_INNER },
    line: { color: C_EMERALD, width: 1 }
  });

  slide5.addText('PERMANENT CIVIC LEGACY: ₹25 LAKH CAPITAL PER MISSION', {
    x: 1.1, y: 5.3, w: 10.0, h: 0.3,
    fontSize: 11, bold: true, color: C_EMERALD
  });

  slide5.addText(
    'Every single outdoor task leaves behind lasting community infrastructure funded by production. Over ₹2.5 Crore is directly deployed into local water pumps, clean ceramic kilns, digital mandi scales, and flood catamarans.',
    {
      x: 1.1, y: 5.7, w: 11.0, h: 0.7,
      fontSize: 11, color: C_WHITE
    }
  );

  // ----------------------------------------------------
  // SLIDE 6: Production Scale & The Grand Mandate
  // ----------------------------------------------------
  const slide6 = pres.addSlide();
  slide6.background = { color: C_DARK_BG };

  slide6.addText('FINALE & PRIZE', {
    x: 0.8, y: 0.5, w: 5.0, h: 0.3,
    fontSize: 11, bold: true, color: C_AMBER, charSpacing: 1.5
  });
  slide6.addText('The Grand Mandate & Coronation Finale', {
    x: 0.8, y: 0.8, w: 11.0, h: 0.6,
    fontSize: 28, bold: true, color: C_WHITE, fontFace: 'Georgia'
  });

  // 4 Metrics
  const metrics = [
    { num: '88', label: 'UHD Broadcast Cameras' },
    { num: '24/7', label: 'Uncut Mobile Streams' },
    { num: '₹5 Cr', label: 'Seed War Chest' },
    { num: '100M+', label: 'Projected Ballots' }
  ];

  metrics.forEach((m, idx) => {
    const cardX = 0.8 + idx * 3.0;
    slide6.addShape(pres.ShapeType.roundRect, {
      x: cardX, y: 1.6, w: 2.8, h: 1.4,
      rectRadius: 0.1,
      fill: { color: C_CARD_BG },
      line: { color: '334155', width: 1 }
    });

    slide6.addText(m.num, {
      x: cardX + 0.15, y: 1.8, w: 2.5, h: 0.6,
      fontSize: 26, bold: true, color: C_AMBER, align: 'center', fontFace: 'Georgia'
    });

    slide6.addText(m.label, {
      x: cardX + 0.15, y: 2.4, w: 2.5, h: 0.3,
      fontSize: 10.5, color: C_MUTED, align: 'center'
    });
  });

  // Grand Mandate description cards
  const prizes = [
    {
      title: '₹5 Crore Campaign Seed Grant',
      text: 'Deposited into an independently audited public campaign & policy trust for the winner\'s upcoming electoral run.'
    },
    {
      title: 'Prime-Time National Address',
      text: 'An uninterrupted 15-minute televised national keynote address broadcast across major news networks.'
    },
    {
      title: 'The Leader\'s Policy Endowment',
      text: 'Ongoing matching grants for the winner\'s flagship public welfare legislation proposal.'
    },
    {
      title: 'Independent Certified Audit',
      text: 'All digital viewer votes and House counts audited live by an accredited election monitoring firm.'
    }
  ];

  prizes.forEach((p, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const xPos = 0.8 + col * 5.9;
    const yPos = 3.3 + row * 1.6;

    slide6.addShape(pres.ShapeType.roundRect, {
      x: xPos, y: yPos, w: 5.7, h: 1.35,
      rectRadius: 0.1,
      fill: { color: C_CARD_INNER },
      line: { color: '334155', width: 1 }
    });

    slide6.addText(p.title, {
      x: xPos + 0.3, y: yPos + 0.2, w: 5.1, h: 0.35,
      fontSize: 13, bold: true, color: C_WHITE
    });

    slide6.addText(p.text, {
      x: xPos + 0.3, y: yPos + 0.58, w: 5.1, h: 0.65,
      fontSize: 11, color: C_MUTED
    });
  });

  // Save the presentation as PPTX file
  await pres.writeFile({ fileName: 'The_Next_Leader_Pitch_Deck.pptx' });
}

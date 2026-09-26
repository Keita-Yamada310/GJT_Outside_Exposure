// パイロット2 GJT用・32項目版（sendを除外、get / start / arrive / askを反映）
// GJTは32項目中、奇数番号を文法文、偶数番号を非文法文として提示します
// （文法文16、非文法文16）。
// 各項目にはgrammatical_sentence / ungrammatical_sentenceも保持しているため、
// 将来Set A/B化できます。

const GJT_ITEM_PAIRS = [
  { item_id: 1, category: "v-obj", verb: "find", pattern: "find + NP", grammatical_sentence: "I found my key.", ungrammatical_sentence: "I found to my key.", error_type: "Extra preposition" },
  { item_id: 2, category: "v-obj", verb: "like", pattern: "like + NP", grammatical_sentence: "I like this book.", ungrammatical_sentence: "I like to this book.", error_type: "Extra preposition" },
  { item_id: 3, category: "v-obj", verb: "hear", pattern: "hear + NP", grammatical_sentence: "We heard the news.", ungrammatical_sentence: "We heard to the news.", error_type: "Extra preposition" },
  { item_id: 4, category: "v-obj", verb: "meet", pattern: "meet + NP", grammatical_sentence: "I met my teacher.", ungrammatical_sentence: "I met with my teacher.", error_type: "Extra preposition" },
  { item_id: 5, category: "v-comp[to-inf]", verb: "want", pattern: "want + to V", grammatical_sentence: "I want to visit Kyoto.", ungrammatical_sentence: "I want visit Kyoto.", error_type: "Missing infinitival to" },
  { item_id: 6, category: "v-comp[to-inf]", verb: "begin", pattern: "begin + to V", grammatical_sentence: "It began to rain.", ungrammatical_sentence: "It began rain.", error_type: "Missing infinitival to" },
  { item_id: 7, category: "v-comp[to-inf]", verb: "try", pattern: "try + to V", grammatical_sentence: "She tried to open the door.", ungrammatical_sentence: "She tried open the door.", error_type: "Missing infinitival to" },
  { item_id: 8, category: "v-comp[to-inf]", verb: "decide", pattern: "decide + to V", grammatical_sentence: "We decided to leave early.", ungrammatical_sentence: "We decided leave early.", error_type: "Missing infinitival to" },
  { item_id: 9, category: "v-obl[at]", verb: "look", pattern: "look + at NP", grammatical_sentence: "The boy looked at the picture.", ungrammatical_sentence: "The boy looked the picture.", error_type: "Missing preposition" },
  { item_id: 10, category: "v-obl[at]", verb: "smile", pattern: "smile + at NP", grammatical_sentence: "The woman smiled at the boy.", ungrammatical_sentence: "The woman smiled the boy.", error_type: "Missing preposition" },
  { item_id: 11, category: "v-obl[at]", verb: "point", pattern: "point + at NP", grammatical_sentence: "She pointed at the map.", ungrammatical_sentence: "She pointed the map.", error_type: "Missing preposition" },
  { item_id: 12, category: "v-comp", verb: "feel", pattern: "feel + Adj", grammatical_sentence: "I feel happy today.", ungrammatical_sentence: "I feel happily today.", error_type: "Wrong complement form" },
  { item_id: 13, category: "v-comp", verb: "become", pattern: "become + Adj", grammatical_sentence: "He became famous.", ungrammatical_sentence: "He became to be famous.", error_type: "Extra infinitival phrase" },
  { item_id: 14, category: "v-comp", verb: "get", pattern: "get + Adj", grammatical_sentence: "The room got dark.", ungrammatical_sentence: "The room got to dark.", error_type: "Extra infinitival to" },
  { item_id: 15, category: "v-obl[to]", verb: "go", pattern: "go + to NP", grammatical_sentence: "We went to school.", ungrammatical_sentence: "We went school.", error_type: "Missing preposition" },
  { item_id: 16, category: "v-obl[to]", verb: "talk", pattern: "talk + to NP", grammatical_sentence: "I talked to my friend.", ungrammatical_sentence: "I talked my friend.", error_type: "Missing preposition" },
  { item_id: 17, category: "v-obl[to]", verb: "listen", pattern: "listen + to NP", grammatical_sentence: "We listened to music.", ungrammatical_sentence: "We listened music.", error_type: "Missing preposition" },
  { item_id: 18, category: "v-obl[to]", verb: "speak", pattern: "speak + to NP", grammatical_sentence: "She spoke to the teacher.", ungrammatical_sentence: "She spoke the teacher.", error_type: "Missing preposition" },
  { item_id: 19, category: "v-comp[that]", verb: "think", pattern: "think + that-clause", grammatical_sentence: "I think that he is right.", ungrammatical_sentence: "I think him is right.", error_type: "Wrong complement structure" },
  { item_id: 20, category: "v-comp[that]", verb: "know", pattern: "know + that-clause", grammatical_sentence: "I know that she can swim.", ungrammatical_sentence: "I know her can swim.", error_type: "Wrong complement structure" },
  { item_id: 21, category: "v-comp[that]", verb: "hope", pattern: "hope + that-clause", grammatical_sentence: "I hope that she will come.", ungrammatical_sentence: "I hope her will come.", error_type: "Wrong complement structure" },
  { item_id: 22, category: "v-obj-comp[bare-inf]", verb: "let", pattern: "let + O + bare V", grammatical_sentence: "My mother let me use her phone.", ungrammatical_sentence: "My mother let me to use her phone.", error_type: "Extra infinitival to" },
  { item_id: 23, category: "v-obj-comp[bare-inf]", verb: "see", pattern: "see + O + bare V", grammatical_sentence: "I saw the boy cross the street.", ungrammatical_sentence: "I saw the boy to cross the street.", error_type: "Extra infinitival to", acceptable_alternative: "see + O + V-ing" },
  { item_id: 24, category: "v-obj-comp[bare-inf]", verb: "make", pattern: "make + O + bare V", grammatical_sentence: "The movie made me cry.", ungrammatical_sentence: "The movie made me to cry.", error_type: "Extra infinitival to" },
  { item_id: 25, category: "v-obj-comp[bare-inf]", verb: "watch", pattern: "watch + O + bare V", grammatical_sentence: "We watched the boy play football.", ungrammatical_sentence: "We watched the boy to play football.", error_type: "Extra infinitival to", acceptable_alternative: "watch + O + V-ing" },
  { item_id: 26, category: "v-obj-obl[to]", verb: "take", pattern: "take + O + to NP", grammatical_sentence: "My father took me to school.", ungrammatical_sentence: "My father took to school me.", error_type: "Argument order" },
  { item_id: 27, category: "v-obj-obj", verb: "give", pattern: "give + IO + DO", grammatical_sentence: "She gave me a book.", ungrammatical_sentence: "She gave a book me.", error_type: "Argument order" },
  { item_id: 28, category: "v-obj-obj", verb: "show", pattern: "show + IO + DO", grammatical_sentence: "He showed me a picture.", ungrammatical_sentence: "He showed a picture me.", error_type: "Argument order" },
  { item_id: 29, category: "v-obj-obj", verb: "tell", pattern: "tell + IO + DO", grammatical_sentence: "She told me a story.", ungrammatical_sentence: "She told a story me.", error_type: "Argument order" },
  { item_id: 30, category: "v-comp[to-inf]", verb: "start", pattern: "start + to V", grammatical_sentence: "The children started to run outside.", ungrammatical_sentence: "The children started run outside.", error_type: "Missing infinitival to", acceptable_alternative: "start + V-ing" },
  { item_id: 31, category: "v-obl[at]", verb: "arrive", pattern: "arrive + at NP", grammatical_sentence: "The train arrived at the station.", ungrammatical_sentence: "The train arrived the station.", error_type: "Missing preposition", acceptable_alternative: "arrive + in NP / arrive home" },
  { item_id: 32, category: "v-obj-obj", verb: "ask", pattern: "ask + IO + DO", grammatical_sentence: "She asked me a question.", ungrammatical_sentence: "She asked a question me.", error_type: "Argument order" }
];

const GJT_ITEMS = GJT_ITEM_PAIRS.map(item => {
  const presented_status = item.item_id % 2 === 1 ? "grammatical" : "ungrammatical";
  return {
    ...item,
    presented_status,
    sentence: presented_status === "grammatical"
      ? item.grammatical_sentence
      : item.ungrammatical_sentence
  };
});

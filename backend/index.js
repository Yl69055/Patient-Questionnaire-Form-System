const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL连接
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'medical1012',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
pool.getConnection((err, connection) => {
  if (err) {
    console.error('连接数据库时出错:', err);
  } else {
    console.log('成功连接到数据库。');
    connection.release();
  }
});

// 测试路由
app.get('/api/test', (req, res) => {
  console.log('测试路由被访问');
  res.json({ message: '后端正常工作' });
});

// API端点保存表单数据
app.post('/api/save-questionnaire', (req, res) => {
  console.log('接收到的表单数据:', req.body);
  const {
    patientName,
    age,
    gender,
    dominantHand,
    injurySide,
    phoneNumber,
    sportLifestyle,
    sportLevel,
    sportType,
    symptoms,
    medicalHistory,
    painLevel,
    painFrequency,
    strongerPainKiller,
    painKillerFrequency,
    painKillerDosage,
    shoulderPain,
    shoulderPainLifting,
    shoulderSatisfaction,
    shoulderComfort,
    painOrSpasm,
    weakness,
    fatigue,
    popping,
    stiffness,
    neckDiscomfort,
    instability,
    compensation,
    protectArm,
    fallConcern,
    problemAwareness,
    worsenConcern,
    emotionalImpact,
    dailyWork,
    routineSports,
    leisureActivities,
    socialImpact,
    workLimitation,
    wearCoat,
    washBack,
    useToilet,
    combHair,
    reachHighShelf,
    putCoinOnShelf,
    liftWeight,
    throwBallLow,
    throwBallHigh,
    reachBehind,
    openBottle,
    heavyHousework,
    carryBags,
    cutFood,
    nightPain,
    sideSleepping,
    sleepDifficulty
  } = req.body;

  const query = `
    INSERT INTO patient_questionnaires (
      patient_name, age, gender, dominant_hand, injury_side,
      phone_number, sport_lifestyle, sport_level, sport_type,
      symptoms, medical_history, pain_level, pain_frequency,
      stronger_pain_killer, pain_killer_frequency, pain_killer_dosage,
      shoulder_pain, shoulder_pain_lifting, shoulder_satisfaction,
      shoulder_comfort, pain_or_spasm, weakness, fatigue, popping,
      stiffness, neck_discomfort, instability, compensation,
      protect_arm, fall_concern, problem_awareness, worsen_concern,
      emotional_impact, daily_work, routine_sports, leisure_activities,
      social_impact, work_limitation, wear_coat, wash_back, use_toilet,
      comb_hair, reach_high_shelf, put_coin_on_shelf, lift_weight,
      throw_ball_low, throw_ball_high, reach_behind, open_bottle,
      heavy_housework, carry_bags, cut_food, night_pain, side_sleepping,
      sleep_difficulty
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    patientName, age, gender, dominantHand, injurySide,
    phoneNumber, sportLifestyle, sportLevel, sportType,
    symptoms, medicalHistory, painLevel, painFrequency,
    strongerPainKiller, painKillerFrequency, painKillerDosage,
    shoulderPain, shoulderPainLifting, shoulderSatisfaction,
    shoulderComfort, painOrSpasm, weakness, fatigue, popping,
    stiffness, neckDiscomfort, instability, compensation,
    protectArm, fallConcern, problemAwareness, worsenConcern,
    emotionalImpact, dailyWork, routineSports, leisureActivities,
    socialImpact, workLimitation, wearCoat, washBack, useToilet,
    combHair, reachHighShelf, putCoinOnShelf, liftWeight,
    throwBallLow, throwBallHigh, reachBehind, openBottle,
    heavyHousework, carryBags, cutFood, nightPain, sideSleepping,
    sleepDifficulty
  ];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('保存问卷时出错:', err);
      res.status(500).json({ error: '保存问卷时出错', details: err.message });
    } else {
      console.log('问卷保存成功:', result);
      res.status(201).json({ message: '问卷保存成功', id: result.insertId });
    }
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`服务器正在运行，端口为 ${PORT}`);
});

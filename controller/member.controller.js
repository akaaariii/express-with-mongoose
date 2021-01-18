const Member = require('../model/members.model');
const AppError = require('../util/AppError');

function wrapAsync(fn){
  return function(req, res, next){
    fn(req, res, next).catch(err => next(err))
  }
}

exports.getAllMember = wrapAsync(async(req, res, next) => {
  const members = await Member.find({});
  if(!members){
    throw new AppError('Members Not Found', 404);
  }
  res.json({ members });
})

exports.getOneMember = wrapAsync(async(req, res, next) => {
  const { id } = req.params;
  const member = await Member.findById(id);
  if (!member) {
    throw new AppError('Member Not Found', 400);
  }
  res.json({ member });
})

exports.createMember = wrapAsync(async(req, res, next) => {
  const newMember = new Member({
    ...req.body,
    status: 'active'
  })
  const result = await newMember.save();
  res.json({ result })
})

exports.updateMember = wrapAsync(async(req, res, next) => {
  const { id } = req.params;
  const result = await Member.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  if (!result) {
    throw new AppError('Member Not Found', 400);
  }
  res.json({ result });
})

exports.deleteMember = wrapAsync(async(req, res, next) => {
  const { id } = req.params;
  const result = await Member.findByIdAndDelete(id);
  if (!result) {
    throw new AppError('Member Not Found', 400);
  }
  res.json({ result });
})

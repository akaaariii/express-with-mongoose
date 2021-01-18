const Member = require('../model/members.model');


exports.getAllMember = async(req, res) => {
  const members = await Member.find({});
  res.json({ members });
}

exports.getOneMember = async(req, res) => {
  const { id } = req.params;
  const member = await Member.findById(id);
  if (!member) {
    res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
    return
  }
  res.json({ member });
}

exports.createMember = async(req, res) => {
  const newMember = new Member({
    ...req.body,
    status: 'active'
  })
  const result = await newMember.save();
  res.json({ result })
}

exports.updateMember = async(req, res) => {
  const { id } = req.params;
  const result = await Member.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  if (!result) {
    res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
    return
  }
  res.json({ result });
}

exports.deleteMember = async(req, res) => {
  const { id } = req.params;
  const result = await Member.findByIdAndDelete(id);
  if (!result) {
    res.status(400).json({ msg: `No member with the id of ${req.params.id} found`});
  }
  res.json({ result });
}

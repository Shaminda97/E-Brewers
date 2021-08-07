const express = require('express')
const router = express.Router()
const Company = require('../models/company')
//all companies
router.get('/',async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const companies = await Company.find(searchOptions)
    res.render('companies/index',{ 
      companies:companies,
      searchOptions: req.query
     })
  } catch {
    res.redirect('/')
  }
   
  })

  //new company
router.get('/new', (req, res) => {
    res.render('companies/new',{ company: new Company()})
  })

  //create company route
router.post('/',async (req, res) => {
  const company = new Company({
    name: req.body.name
  })
  try {
    const newCompany = await company.save()
    res.redirect(`companies/${newCompany.id}`)
  } catch {
    res.render('companies/new', {
      company: company,
      errorMessage: 'Error creating Author'
    })
  }
  //company.save((err, newCompany) =>{
  //   if(err){
  //     res.render('companies/new',{
  //       company: company,
  //       errorMessage: 'Error creating Company'
  //     })
  //   } else{
  //     //res.redirect(`company/${newCompany.id}`)
  //     res.redirect(`companies`)
  //   }
  // })
  })
  
  module.exports = router
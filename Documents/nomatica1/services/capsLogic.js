const { findContracts } = require('./modules/contractFinder');
const { sendProposalEmail } = require('./modules/emailProposal');
const { findSubcontractors } = require('./modules/subcontractorFinder');
const { calculatePricing } = require('./modules/pricingEngine');

async function processCAPSRequest(query) {
  query = query.toLowerCase();

  if (query.includes('find contract')) {
    return await findContracts(query);
  }
  if (query.includes('submit proposal')) {
    return await sendProposalEmail(query);
  }
  if (query.includes('subcontractor')) {
    return await findSubcontractors(query);
  }
  if (query.includes('price') || query.includes('markup')) {
    return await calculatePricing(query);
  }

  return "Sorry, I couldn't understand that request.";
}

module.exports = { processCAPSRequest };

async function testCompileAPI() {
  try {
    const res = await fetch('http://localhost:3000/api/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Prioritize flood resilience, maximize stormwater retention, and keep budget under 50 Lakhs.',
        budgetInr: 5000000
      })
    });

    console.log('HTTP Status:', res.status);
    const data = await res.json();
    console.log('Success:', data.success);
    console.log('Compiled Plan Provider:', data.compiledPlan?.intent_summary);
    console.log('Candidates count:', data.candidates?.length);
    console.log('Scenarios generated:', Object.keys(data.optimizationResult?.scenarios || {}));
    if (data.success && data.candidates?.length > 0) {
      console.log('API COMPILE TEST: PASSED [200 OK]');
    } else {
      console.error('API COMPILE TEST: FAILED');
      process.exit(1);
    }
  } catch (err) {
    console.error('Error testing API:', err);
    process.exit(1);
  }
}

testCompileAPI();

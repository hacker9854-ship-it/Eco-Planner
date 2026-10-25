async function testAnalyzeAPI() {
  try {
    const res = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        polygon: {
          type: 'Polygon',
          coordinates: [
            [
              [72.9750, 19.2150],
              [72.9820, 19.2150],
              [72.9820, 19.2210],
              [72.9750, 19.2210],
              [72.9750, 19.2150]
            ]
          ]
        }
      })
    });

    console.log('HTTP Status:', res.status);
    const data = await res.json();
    console.log('Success:', data.success);
    console.log('Site Area Ha:', data.analysis?.siteAreaHectares);
    console.log('Vegetation NDVI:', data.analysis?.vegetationHealthNDVI?.value);
    console.log('Surface Temp Delta:', data.analysis?.urbanHeatIslandDeltaC?.value);
    if (data.success && data.analysis?.siteAreaHectares) {
      console.log('API ANALYZE TEST: PASSED [200 OK]');
    } else {
      console.error('API ANALYZE TEST: FAILED');
      process.exit(1);
    }
  } catch (err) {
    console.error('Error testing Analyze API:', err);
    process.exit(1);
  }
}

testAnalyzeAPI();

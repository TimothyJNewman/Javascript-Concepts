/*
* Testing out iterating through arrays synchronously and asynchronously
*/

const longRunningFunction = async (name, id) => {
  return new Promise((resolve) => {
    // const numOfMillis = Math.round(Math.pow(2, Math.round(Math.random() * 10)))
    const numOfMillis = 20
    setTimeout(() => {
      // console.log(`${name}=>${id} numOfIterations: ${numOfMillis}`);
      resolve(`${name}=>${id} numOfMillis: ${numOfMillis}`);
    }, numOfMillis);
  });
}

const testArray = [...Array(30).keys()]

// sync loop
const forLoop = async (name, testArray) => {
  console.time('forLoop')
  for (let i = 0; i < testArray.length; i++) {
    const result = await longRunningFunction(name, testArray[i])
    console.log('\x1b[31m%s\x1b[0m', result)
  }
  console.timeEnd('forLoop')
}

// sync loop
const forOfLoop = async (name, testArray) => {
  console.time("forOfLoop")
  for (let elem of testArray) {
    const result = await longRunningFunction(name, elem)
    console.log('\x1b[32m%s\x1b[0m', result)
  }
  console.timeEnd("forOfLoop")
}

// sync loop
const reduceLoop = async (name, testArray) => {
  console.time('reduceLoop')
  await testArray.reduce(async (acc, elem) => {
    await acc
    const result = await longRunningFunction(name, elem)
    console.log('\x1b[35m%s\x1b[0m', result)
    return result
  })
  console.timeEnd('reduceLoop')
}

// async loop 
const forEachLoop = (name, testArray) => {
  console.time('forEachLoop')
  testArray.forEach(async (elem) => {
    const result = await longRunningFunction(name, elem)
    console.log('\x1b[34m%s\x1b[0m', result)
  })
  // timing does not work since forEach cannot be awaited
  console.timeEnd('forEachLoop')
}

// async loop
const mapLoop = async (name, testArray) => {
  console.time('mapLoop')
  const promiseArray = testArray.map(async (elem) => {
    const result = await longRunningFunction(name, elem)
    console.log('\x1b[33m%s\x1b[0m', result)
  })
  await Promise.all(promiseArray)
  console.timeEnd('mapLoop')
}

forLoop('forLoop', testArray)

forOfLoop("forOfLoop", testArray)

forEachLoop('forEachLoop', testArray)

mapLoop("mapLoop", testArray)

reduceLoop("reduceLoop", testArray)
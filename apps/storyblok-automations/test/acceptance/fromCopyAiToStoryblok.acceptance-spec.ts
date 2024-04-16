describe('FromCopyAiToStoryblok', () => {
  beforeEach(async () => {});

  it('get post data from copy.ai and create a new draft post on Storyblok', () => {
    const validatedData = apiGetPostDataFromCopyAi({});
    const storyblokResponse = createDraftPostOnStoryblok(validatedData);
    storyblokResponseShouldBeSuccessful(storyblokResponse);
  });
});

function apiGetPostDataFromCopyAi(bodyRequest: any) {
  console.log(bodyRequest);
  throw new Error('Function not implemented.');
}

function createDraftPostOnStoryblok(data: any) {
  console.log(data);
  throw new Error('Function not implemented.');
}

function storyblokResponseShouldBeSuccessful(httpResult: any) {
  console.log(httpResult);
  throw new Error('Function not implemented.');
}

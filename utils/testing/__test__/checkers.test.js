import { assert, batchAssert } from "../assertions";
import { buildScene } from "../build";
import {
  areAssertItems,
  areOrganizations,
  areScenes,
  isAssertArtifact,
  isAssertItem,
} from "../checkers";
import { expectToBe, expectToBeEqual } from "../expectTo";
import {
  assertFixtures,
  validAssertLength2Item,
  validAssertLength3Item,
  invalidAssertItemLength,
  invalidAssertCallbackItem,
  validOrganizations,
} from "./fixtures";

let assertItem, assertItems;

describe("checkers", () => {
  it("should assert checker areAssertItems", () => {
    assertItem = [ areAssertItems(assertFixtures), expectToBeEqual, true ];
    assert(assertItem);
  });
  it("should batchAssert checker isAssertArtifact", () => {
    assertItems = [
      [ isAssertArtifact(assertFixtures), expectToBeEqual, true ],
      [ isAssertArtifact(invalidAssertItemLength), expectToBeEqual, false ],
    ];

    batchAssert(assertItems);
  });
  it("should batchAssert checker isAssertItem", () => {
    assertItems = [
      [ isAssertItem(validAssertLength2Item), expectToBeEqual, true ],
      [ isAssertItem(validAssertLength3Item), expectToBeEqual, true ],
      [ isAssertItem(invalidAssertItemLength), expectToBeEqual, false ],
      [ isAssertItem(invalidAssertCallbackItem), expectToBeEqual, false ],
    ];

    batchAssert(assertItems);
  });
  it("should assert ", () => {
    assertItem = [areOrganizations(validOrganizations), expectToBeEqual, true];

    assert(assertItem);
  });
  it("should return true/false on valid/invalid assert items", () => {
    assertItem = [areOrganizations(validOrganizations), expectToBeEqual, true];

    assert(assertItem);
  });
  it("should return true for valid assert item", () => {
    assertItems = [
      [ isAssertArtifact(validAssertLength2Item), expectToBe, true ],
      [ isAssertArtifact(validAssertLength3Item), expectToBe, true ],
      [ isAssertArtifact(buildScene(validAssertLength2Item)), expectToBe, true ],
      [ isAssertArtifact(buildScene(validAssertLength3Item)), expectToBe, true ],
      [ isAssertArtifact(invalidAssertItemLength),   expectToBe, false ],
      [ isAssertArtifact(invalidAssertCallbackItem), expectToBe, false ],
      [ isAssertArtifact(assertFixtures), expectToBe, true ],
    ];
    
    batchAssert(assertItems);
  });
  it("should return true for valid assert item", () => {
    assertItems = [
      [ areAssertItems(assertFixtures), expectToBe, true ],
      [ areScenes(assertFixtures), expectToBe, false ]
    ];
    
    batchAssert(assertItems);
  });
});


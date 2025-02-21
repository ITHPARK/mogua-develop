import { copyToClipBoard } from "@/utils/copyToClipBorad";

describe("copyToClipBoard 테스트", () => {
  beforeEach(() => {
    jest.spyOn(document, "createElement").mockImplementation((tag) => {
      if (tag === "textarea") {
        return {
          value: "",
          select: jest.fn(),
          setSelectionRange: jest.fn(),
          remove: jest.fn(),
        } as unknown as HTMLTextAreaElement;
      }
      return document.createElement(tag);
    });

    document.execCommand = jest.fn();
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("클립보드 복사가 정상적으로 동작하는지 테스트", () => {
    const mockUrl = "http://localhost/";

    copyToClipBoard(mockUrl);

    expect(document.createElement).toHaveBeenCalledWith("textarea"); // textarea가 생성되었는지 확인
    expect(document.execCommand).toHaveBeenCalledWith("copy"); // 복사 명령이 실행되었는지 확인
    expect(document.body.appendChild).toHaveBeenCalled(); // textarea가 body에 추가되었는지 확인
    expect(document.body.removeChild).toHaveBeenCalled(); // textarea가 제거되었는지 확인
  });
});

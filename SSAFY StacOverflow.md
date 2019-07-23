# SSAFY StacOverflow

### 1. 목적

SSAFY 소속 학생들이 유용하게 이용할 수 있는 develop  질의 사이트 구축

### 2. 시나리오

```
가입 - 프로픽작성 - Question - Answer - 채택 - 내공부여
```

1. **가입 수정 탈퇴** 

   - 관리자 권한

2. **프로필 작성**

   - github 연동

3. **QnA기능**

   - *Question* 
     - 제목 : 비슷한 제목 링크 나열
     - 분류 태그
     - 좋아요
     - 싫어요
   - *Answer*
     - 추천
     - 대댓글
     - 채택
   - *답변 채택* 
     - 강조
   - 내공 부여

   

4. **내 작성글 보기**

   

### 3. DB 모델링(NoSQL)

- 사용자 정보 collection

  - 이름

  - 닉네임

  - 이메일

  - 깃주소

  - 권한

  - 내공

    

- Question post collection

  - 작성자 메일

  - 닉네임

  - 제목

  - 내용

  - 첨부파일

  - 작성일자

  - 태그

  - 좋아요 수 

    

- portfolio post collection

  - 작성자 메일

  - 작성자 닉네임

  - 제목

  - 내용

  - 첨부파일

  - 작성일자

  - 태그

    

- 댓글 collection

  - post token
  - 상위 token
  - 하위 token
  - 닉네임
  - 내용
  - 작성일자



### 역할

- **정상영(조장)**

  - 관리자 페이지

    

- **임현철(사오정)**

  - DB설계

    

- **유승주**

  - 사용자 권한
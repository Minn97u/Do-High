# **두하이(DOHIGH)** 
Blaybus 앱 개발 경진대회 [ 슈퍼노바 팀 ] 최우수상 및 팀워크상 수상작: 
두핸즈 사내에서 구성원들의 성과와 경험치를 시각화 및 관리할 수 있는 웹앱 서비스

## **프로젝트 개요**
DOHIGH는 두핸즈라는 기업의 요구사항을 반영하여, 사내 구성원이 자신의 경험치를 체계적으로 관리하고 레벨업을 목표로 동기를 부여받을 수 있도록 설계되었습니다. 이 프로젝트는 블레이버스 앱 개발 경진대회에 참가하여 개발한 웹앱으로 최우수상과 팀워크상을 수상하며 높은 완성도와 협업 능력을 인정받았습니다.

## **기능 소개**

1. **홈 대시보드**
- 현재 레벨과 다음 레벨 목표 경험치를 한눈에 확인
- 최근 수행한 퀘스트와 경험치 내역 제공
- 시각화된 그래프와 데이터를 통해 경험치 달성도를 직관적으로 파악 가능
  
![스크린샷 2025-05-04 오후 11 47 57](https://github.com/user-attachments/assets/989db66d-82d3-4bde-85ff-2638b1adf966)


2. **경험치 리스트**
- 인사평가, 직무 퀘스트, 리더 퀘스트, 전사 프로젝트로 경험치를 카테고리화
- 금/은/동으로 구분된 코인 아이콘을 사용해 경험치 시각화
- 사용자 경험치 데이터를 정렬 및 필터링하여 확인 가능

![스크린샷 2025-05-04 오후 11 48 53](https://github.com/user-attachments/assets/a52b5ae5-dae3-413b-99b9-063acdf466c0)


3. **퀘스트**
- 직무 및 리더 퀘스트를 월별/주별로 정리하여 직관적으로 표시
- 카드 뒤집기 형식으로 정보를 컴팩트하게 제공
- 한눈에 퀘스트 진행 상황 및 성과 확인 가능

<img width="1000" alt="스크린샷 2025-05-04 오후 11 50 27" src="https://github.com/user-attachments/assets/6bb4600a-d871-4c6f-b504-42b38d068852" />


4. **게시판**
- 관리자 공지사항을 정렬된 리스트 형태로 제공
- 제목, 작성일 등의 정보를 미리 보기로 확인 가능
- 최신순 또는 오래된 순으로 정렬 가능

<img width="1000" alt="스크린샷 2025-05-04 오후 11 50 44" src="https://github.com/user-attachments/assets/18071d73-3678-42a8-a91b-73c5ea16b730" />


5. **마이 페이지)**
- 개인 정보 및 캐릭터 이미지를 사용자 스스로 관리
- 비밀번호 변경 및 관리자 문의 기능 제공
- 현재 레벨 및 누적 경험치 확인 가능

<img width="1000" alt="스크린샷 2025-05-04 오후 11 51 04" src="https://github.com/user-attachments/assets/b5041403-ced4-482c-97b5-068a3e871d8c" />


6. **어드민 페이지**
- 새 계정 생성, 기존 계정 설정, 공지 작성 및 관리
- 공지사항 조회, 수정, 삭제 기능 지원

<img width="1000" alt="스크린샷 2025-05-04 오후 11 51 20" src="https://github.com/user-attachments/assets/7b373914-7be8-415d-9ccb-7eb96c5f033b" />



## **성과**

- **최우수상 및 팀워크상 수상**: 높은 완성도와 협업능력을 인정받은 프로젝트
- **사내 동기 부여 강화**: 경험치 시각화 및 목표 설정으로 구성원 동기 부여
- **관리 효율화**: 관리자 기능 강화로 업무 효율 향상
- **사용자 만족도 증대**: 편리한 UI/UX와 직관적 데이터 시각화를 통해 사용 경험 최적화


<img width="1000" alt="스크린샷 2025-05-03 오후 10 03 55" src="https://github.com/user-attachments/assets/09b0806d-4693-41fe-bb74-bfc8ba9767d3" />

## ERD
<img width="1000" alt="스크린샷 2025-05-03 오후 10 06 08" src="https://github.com/user-attachments/assets/15cd63c8-7e2b-412e-9928-c90cb426d3c3" />

## Information Architecture
<img width="1000" alt="스크린샷 2025-05-03 오후 10 05 24" src="https://github.com/user-attachments/assets/21ba3c0f-c336-4298-a38e-9fb5275c875b" />

<img width="1000" alt="스크린샷 2025-05-03 오후 10 07 18" src="https://github.com/user-attachments/assets/d6e50170-3e77-4594-9e1e-7d4793bfd781" />

# dohigh-frontend


### Branch Naming Convention

| **Prefix** | **Description**                    |
| ---------- | ---------------------------------- |
| `main`     | 서비스 브랜치                      |
| `develop`  | 배포 전 작업 기준 브랜치           |
| `feature`  | 기능 단위 구현 브랜치              |
| `hotfix`   | 서비스 중 긴급 수정 건에 대한 처리 |

### Commit Convention

| **Prefix** | **Description**                        |
| ---------- | -------------------------------------- |
| `feat`     | 기능 구현, 추가                        |
| `fix`      | 버그 수정, 예외 케이스 대응, 기능 개선 |
| `design`   | UI 디자인 작업                         |
| `setting`  | 패키지 설치, 개발 설정                 |
| `refactor` | 코드 리팩터링                          |
| `rename`   | 파일명(또는 폴더명)을 수정             |
| `test`     | 테스트 코드 추가                       |
| `docs`     | README.md 작성 및 변경                 |
| `hotfix`   | 치명적인 버그를 급하게 수정하는 경우   |

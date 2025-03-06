## 폴더 구조 예시 (헥사고널 아키텍쳐 + 도메인 주도 개발 방식 + CQRS 패턴)

```
src/
│── domain/                      # 도메인 계층 (비즈니스 로직)
│   ├── 도메인 명/                
│   │   ├── dto/                 # DTO 모음
│   │   │   ├── request/         # 요청 DTO
│   │   │   ├── response/        # 응답 DTO
│   │   ├── entity/              # 도메인 엔티티
│   │   ├── enumeration/         # Enum 모음
│   │   ├── port/                # 포트
│   │   │   ├── in/              
│   │   │   │   ├── query/       # Query 인터페이스
│   │   │   │   ├── command/     # Command 인터페이스
│   │   │   ├── out/             
│   │   │   │   ├── query/       # Query Repository 인터페이스
│   │   │   │   ├── command/     # Command Repository 인터페이스
│   │   ├── service/             # 비즈니스 로직 구현체
│   │   │   ├── query/
│   │   │   ├── command/
│
│── application/                  # 상태 관리 및 애플리케이션 서비스
│   ├── store/                     # 상태 관리 (Zustand, Redux 등)
│   ├── hooks/                     # 커스텀 훅 (데이터 가져오기 등)
│   ├── providers/                 # Context Provider 모음
│
│── infrastructure/                 # 인프라 계층 (API, Storage, WebSocket)
│   ├── 도메인 명/                  
│   │   ├── repository/            # Repository 구현체 (API 통신)
│   │   ├── storage/               # LocalStorage, IndexedDB 등의 저장소
│   │   ├── external-api/          # 외부 API 연동
│   │   ├── websocket/             # WebSocket 관련 모듈
│
│── presentation/                   # UI 계층
│   ├── components/                 # 공통 UI 컴포넌트
│   ├── pages/                      # 페이지 단위 컴포넌트
│   ├── hooks/                      # UI 관련 훅 (예: useModal)
│   ├── layouts/                    # 페이지 레이아웃
│
│── interface/                      # 어댑터 계층 (컨트롤러 역할)
│   ├── 도메인 명/                  
│   │   ├── rest-api/               # REST API 엔드포인트
│   │   ├── websocket/              # WebSocket 엔드포인트
│
│── common/                         # 공통 유틸리티
│   ├── logger/                     # 로깅 유틸
│   ├── exception/                  # 예외 처리
│   ├── encryption/                 # 암호화 관련 유틸
│── App.tsx                         # 애플리케이션 진입점
│── main.tsx                        # React DOM 렌더링 엔트리
│── routes.tsx                      # 라우팅 설정
```

## 명명 규칙 (파일명)

### 클래스, 인터페이스 명명 규칙
```
기본적으로 ts 앞까지 붙여서 파일 생성 user.entity.ts -> UserEntity      
query-jwt.use-case.ts -> QueryJwtUseCase      
```

### 파일 이름이 두 의미로 띄워서 만들어야 할 경우
```
example) userRole.ts      
 -> user-role.type.ts 중간에 하이픈 넣어서 명명      
database는 한 단어이므로 database.ts      
```

### 포트와 상속받아 사용하는 구현체에는 CQRS 패턴을 적용 권고
```
CQRS(Command Query Responsibility Segregation) 패턴을 적용.      

Command (생성, 수정, 삭제): 상태를 변경하는 로직을 포함      example) command-jwt.use-case.ts
Query (조회, 읽기): 데이터 조회만 담당      example) query-jwt.use-case.ts
```

### dto request, response 명명 규칙
```
request -> request-이름.dto.ts      
response -> response-이름.dto.ts      
```

### enumeration 명명 규칙
```
이름.type.ts 으로 명명 ex) user-role.type.ts      
export enum UserRoleType {      
  ADMIN = 'admin',      
  USER = 'user',      
}      
```
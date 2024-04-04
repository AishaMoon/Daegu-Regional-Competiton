<?php include_once "header.php"; ?>



<!-- 회원가입 -->
<div class="sign s1">
    <h1>회원가입</h1>
    <div class="back">
        <div class="modal">
            <form method="post" id="from">
                <div class="id">
                    <input type="text" name="id" id="id" placeholder="아이디">
                    <button>아이디 중복 확인</button>
                </div>
                <input type="text" name="name" id="name" placeholder="이름">
                <input type="password" name="password" id="pass" placeholder="비밀번호">
                <input type="text" id="captcha" name="captcha" placeholder="캡챠">
    
                <div class="btn">
                    <button class="submitBtn">가입하기</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    
</script>

<?php include_once "footer.php" ?>


